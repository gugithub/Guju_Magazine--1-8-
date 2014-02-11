//
//  ContentViewController.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-20.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "ContentViewController.h"
#import "ArticlesKVC.h"
#import "Links_verKVC.h"
#import "ColumnViewCell.h"
#import "Entity.h"
#import "AppDelegate.h"
#import "RightViewController.h"

@interface ContentViewController ()
{
    NSMutableArray *pdfArr;
    NSMutableArray *linkBigArr;
    NSMutableArray *linkSmallArr;
    NSMutableArray *picSmallArr;
    NSMutableArray *picBigArr;
    NSMutableArray *thumbArr;
    NSMutableArray *titlesArr;
    NSMutableArray *IdArr;
    
    NSInteger totalPage;
    int tapFlage;
    UIView *navView;
    UIView *thumbView;
    UIColumnView *columnview;
    
    NSMutableSet *recycledPages;
    NSMutableSet *visiblePages;
    CustomScrollView *customScroll;
    
    NSInteger Id;
    NSMutableArray *dicArr;
}
@end

@implementation ContentViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    //隐藏状态栏
    if ([self respondsToSelector:@selector(setNeedsStatusBarAppearanceUpdate)]) {
        [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
        [self prefersStatusBarHidden];
        [self performSelector:@selector(setNeedsStatusBarAppearanceUpdate)];
    }
    
//    [self prefersStatusBarHidden];
    
    pdfArr = [NSMutableArray array];
    linkBigArr = [NSMutableArray array];
    picBigArr = [NSMutableArray array];
    thumbArr = [NSMutableArray array];
    titlesArr = [NSMutableArray array];
    IdArr = [NSMutableArray array];
    dicArr = [NSMutableArray array];
    
    for (NSArray *arr in self.articles) {
        for (NSDictionary *dic in arr) {
            [dicArr addObject:dic];
            
            ArticlesKVC *articles = [[ArticlesKVC alloc] initWithDic:dic];
           
            NSString *thumbPaht = [[NSBundle mainBundle] pathForResource:[NSString stringWithFormat:@"259/%@",articles->thumb_ver] ofType:nil];
            [thumbArr addObject:thumbPaht];
            
            NSString *title = articles.title;
            [titlesArr addObject:title];
            
           
            //获取图片
            picSmallArr = [NSMutableArray array];
            for (NSString *string in articles->pdf_ver) {
                NSString *imagePath = [[NSBundle mainBundle] pathForResource:[NSString stringWithFormat:@"259/%@",string] ofType:nil];
                //一个页面中的图片
                [picSmallArr addObject:imagePath];
            }
            [picBigArr addObject:picSmallArr];
            
            //获取HTML
            linkSmallArr = [NSMutableArray array];
            for (NSString *string in articles->links_ver) {
                //一个页面中的HTML
                [linkSmallArr addObject:string];
            }
            [linkBigArr addObject:linkSmallArr];
        }
    }
    totalPage = [picBigArr count];
    //横向滑动的scrollview
    self.horizontalScroll.delegate = self;
    self.horizontalScroll.contentSize = CGSizeMake(ScreenWidth*totalPage, ScreenHeight);
    self.horizontalScroll.directionalLockEnabled = YES;
    self.horizontalScroll.tag = 1000;
    self.horizontalScroll.pagingEnabled = YES;
    
    recycledPages = [[NSMutableSet alloc] init];
    visiblePages = [[NSMutableSet alloc] init];
    
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doTap:)];
    tap.delegate = self;
    tapFlage = 1;
    tap.numberOfTapsRequired = 1;
    [self.view addGestureRecognizer:tap];
    UITapGestureRecognizer *doubleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doTap:)];
    doubleTap.numberOfTapsRequired = 2;
    [self.view addGestureRecognizer:doubleTap];
    [tap requireGestureRecognizerToFail:doubleTap];
   
    int currentPage = [self.currentPage integerValue];
    [self titlePagesWithPageId:currentPage flage:1];
    
}
#pragma mark - scrollview重用机制
- (void)titlePagesWithPageId:(NSInteger)index flage:(NSInteger)flg
{
    if (flg) {
        self.horizontalScroll.contentOffset = CGPointMake(ScreenWidth*index, 0);
    }
    CGRect visibleBounds = self.horizontalScroll.bounds;
   
    int firstNeededPageIndex = CGRectGetMinX(visibleBounds)/CGRectGetWidth(visibleBounds);
    int lastNeededPageIndex = (CGRectGetMaxX(visibleBounds)-1)/CGRectGetWidth(visibleBounds);
    firstNeededPageIndex = MAX(firstNeededPageIndex, 0);
    lastNeededPageIndex = MIN(lastNeededPageIndex, totalPage-1);
    for (CustomScrollView *scroll in visiblePages) {
        if (scroll.index < firstNeededPageIndex || scroll.index > lastNeededPageIndex) {
            [recycledPages addObject:scroll];

            [scroll removeFromSuperview];
        }
    }
    [visiblePages minusSet:recycledPages];
    // add missing pages

    for (int i = firstNeededPageIndex; i<=lastNeededPageIndex; i++) {
        if (![self isDisplayingPageForIndex:i]) {
            CustomScrollView *scroll = [self dequeueRecyclePage];
            if (scroll == nil) {
                scroll = [[CustomScrollView alloc] init];
            }
            [self initCustomScrollView:scroll forIndex:i];
            [self.horizontalScroll addSubview:scroll];
            [visiblePages addObject:scroll];
        }
    }
}
- (CustomScrollView *)dequeueRecyclePage
{
    customScroll = [recycledPages anyObject];
    if (customScroll) {
        [recycledPages removeObject:customScroll];
    }
    return customScroll;
}
- (BOOL)isDisplayingPageForIndex:(NSUInteger)index
{
    BOOL foundPage = NO;
    for (CustomScrollView *scroll in visiblePages) {
        if (scroll.index == index) {
            foundPage = YES;
            break;
        }
    }
    return foundPage;
}
- (void)initCustomScrollView:(CustomScrollView *)scroll forIndex:(NSUInteger)index
{
    scroll.index = index;
    Id = index;
    
    [scroll getPictures:[picBigArr objectAtIndex:index] links:[linkBigArr objectAtIndex:index]];
    scroll.frame = CGRectMake(ScreenWidth*index, 0, ScreenWidth, ScreenHeight);
}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    self.view = nil;
    // Dispose of any resources that can be recreated.
}
//隐藏状态栏调的方法
- (BOOL)prefersStatusBarHidden
{
    return YES;
}
#pragma mark - scrollview 的代理方法
- (void)scrollViewDidScroll:(UIScrollView *)aScrollView {
    if (aScrollView.tag == 1000) {
        if (!tapFlage) {
            [self doTap:nil];
        }
        [self titlePagesWithPageId:0 flage:0];
    }
}

#pragma mark - doTap方法

- (void)doTap:(UITapGestureRecognizer *)tapGesture
{
    
    if (tapFlage) {
        navView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, ScreenWidth, 64)];
        navView.backgroundColor = [UIColor blackColor];
        navView.alpha = 0.8;
        navView.transform = CGAffineTransformMakeTranslation(0, -64);
        //返回主页
        UIButton *mainBt = [UIButton buttonWithType:UIButtonTypeCustom];
        mainBt.frame = CGRectMake(20, 9, 50, 46);
        [mainBt setImage:[UIImage imageNamed:@"btn_home@2x.png"] forState:UIControlStateNormal];
        [mainBt addTarget:self action:@selector(clickMainBt) forControlEvents:UIControlEventTouchUpInside];
        [navView addSubview:mainBt];
        //收藏
        UIButton *collectionBt = [UIButton buttonWithType:UIButtonTypeCustom];
        collectionBt.frame = CGRectMake(768-70, 9, 51, 46);
        [collectionBt setImage:[UIImage imageNamed:@"icon_favourite_normal.png"] forState:UIControlStateNormal];
        [collectionBt addTarget:self action:@selector(clickCollectionBt:) forControlEvents:UIControlEventTouchUpInside];
        [navView addSubview:collectionBt];
        
        columnview = [[UIColumnView alloc] initWithFrame:CGRectMake(0, ScreenHeight-300, ScreenWidth, 300)];
        columnview.backgroundColor = [UIColor blackColor];
        columnview.viewDelegate = self;
        columnview.viewDataSource = self;
        columnview.bounces = NO;
        columnview.autoresizingMask = UIViewAutoresizingFlexibleWidth;
        columnview.transform = CGAffineTransformMakeTranslation(0, 300);
        
        [UIView animateWithDuration:0.5 animations:^{
            [self.view addSubview:navView];
             navView.transform = CGAffineTransformMakeTranslation(0, 0);
            [self.view addSubview:columnview];
            columnview.transform = CGAffineTransformMakeTranslation(0, 0);
            
        }completion:^(BOOL finished){
            tapFlage = 0;
        }];
    }else{
        
        [UIView animateWithDuration:0.5 animations:^{
            navView.transform = CGAffineTransformMakeTranslation(0, -64);
            columnview.transform = CGAffineTransformMakeTranslation(0, 300);
           
        }completion:^(BOOL finished){
            [navView removeFromSuperview];
            navView = nil;
            [columnview removeFromSuperview];
            columnview = nil;
            tapFlage = 1;
        }];

    }
    
}
#pragma mark -
#pragma mark -clickCollectionBt 方法
- (void)clickCollectionBt:(UIButton *)bt
{
    AppDelegate *appDelegate = [[UIApplication sharedApplication] delegate];
    NSManagedObjectContext *context = [appDelegate managedObjectContext];
    Entity *entity = [NSEntityDescription insertNewObjectForEntityForName:@"Entity" inManagedObjectContext:context];

    entity.data = [NSKeyedArchiver archivedDataWithRootObject:[dicArr objectAtIndex:Id]];
    [context save:nil];
    RightViewController *rightVC = [RightViewController sharedRigntVC];
    [rightVC loadData];
}
#pragma mark - clickMainBt方法
- (void)clickMainBt
{
    
    [self dismissViewControllerAnimated:YES completion:^{
        self.horizontalScroll.delegate = nil;
        pdfArr = nil;
        linkBigArr = nil;
        linkSmallArr = nil;
        picSmallArr = nil;
        picBigArr = nil;
        thumbArr = nil;
        titlesArr = nil;
        IdArr = nil;
        recycledPages = nil;
        visiblePages = nil;
    }];

    
}
#pragma mark -
#pragma mark UIColumnViewDelegate method implementation

- (void)columnView:(UIColumnView *)columnView didSelectColumnAtIndex:(NSUInteger)index
{
    [self titlePagesWithPageId:index flage:1];
}


- (CGFloat)columnView:(UIColumnView *)columnView widthForColumnAtIndex:(NSUInteger)index {
    return 198;
}


#pragma mark -
#pragma mark -UIColumnViewDataSource method implementation

- (NSUInteger)numberOfColumnsInColumnView:(UIColumnView *)columnView {
    return [thumbArr count];
}

- (UITableViewCell *)columnView:(UIColumnView *)columnView viewForColumnAtIndex:(NSUInteger)index {
    static NSString *cellIdentifier = @"defaultCell";
    
    ColumnViewCell *cell = (ColumnViewCell *)[columnView dequeueReusableCellWithIdentifier:cellIdentifier];
    if (cell == nil) {
        cell = [[ColumnViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    cell.backgroundColor = [UIColor clearColor];
    cell.imgView.image = [UIImage imageWithContentsOfFile:[thumbArr objectAtIndex:index]];
    cell.label.text = [titlesArr objectAtIndex:index];
    return cell;
}
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch
{
    if ([NSStringFromClass([touch.view class]) isEqualToString:@"UITableViewCellContentView"]) {
        return NO;
    }
    return YES;
}

- (void)dealloc
{
    self.horizontalScroll.delegate = nil;
    pdfArr = nil;
    linkBigArr = nil;
    linkSmallArr = nil;
    picSmallArr = nil;
    picBigArr = nil;
    thumbArr = nil;
    titlesArr = nil;
    IdArr = nil;
}
@end
