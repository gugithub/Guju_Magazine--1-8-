//
//  RightViewController.m
//  Guju_Magazine
//
//  Created by Guju on 13-12-16.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "RightViewController.h"
#import "RightVCCollectionViewCell.h"
#import "ArticlesKVC.h"
#import "ContentViewController.h"
#import "AppDelegate.h"

@interface RightViewController ()
{
    NSMutableArray *thumbArr;
    NSMutableArray *titlesArr;
    NSMutableArray *articleArr;
    NSInteger currentPage;
}
@end

@implementation RightViewController

static RightViewController *rightVC = nil;
+ (RightViewController *)sharedRigntVC
{
    if (rightVC == nil) {
        UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main_iPad" bundle:nil];
        rightVC = [storyBoard instantiateViewControllerWithIdentifier:@"rightView"];
    }
    return rightVC;
}
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
    NSLog(@"666");
    thumbArr = [[NSMutableArray alloc] init];
    titlesArr = [[NSMutableArray alloc] init];
    articleArr = [[NSMutableArray alloc] init];
    [self loadData];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (void)loadData
{
    
    if ([thumbArr count] != 0) {
        [thumbArr removeAllObjects];
        [titlesArr removeAllObjects];
        [articleArr removeAllObjects];
    }
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication]delegate];
    NSManagedObjectContext *context = [appDelegate managedObjectContext];
    NSFetchRequest *request = [[NSFetchRequest alloc] initWithEntityName:@"Entity"];
    NSArray *fetchResult = [context executeFetchRequest:request error:nil];
    
    for (int i = 0; i < [fetchResult count]; i++) {
        Entity *e = [fetchResult objectAtIndex:i];
//        NSKeyedArchiver archivedDataWithRootObject:[dicArr objectAtIndex:Id]];
//        NSLog(@"%@",[NSKeyedUnarchiver unarchiveObjectWithData:e.data]);
        NSDictionary *dic = [NSKeyedUnarchiver unarchiveObjectWithData:e.data];
        NSMutableArray *array = [NSMutableArray array];
        [array addObject:dic];
        [articleArr addObject:array];
        ArticlesKVC *articles = [[ArticlesKVC alloc] initWithDic:dic];
        NSString *thumbPaht = [[NSBundle mainBundle] pathForResource:[NSString stringWithFormat:@"259/%@",articles->thumb_ver] ofType:nil];
        [thumbArr addObject:thumbPaht];
        NSString *title = articles.title;
        [titlesArr addObject:title];
    }
    
    [self.collectionView reloadData];
}
#pragma mark -
#pragma mark -collectionView代理方法
- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return [thumbArr count];
}
- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *identifier = @"reuse1";
    RightVCCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:identifier forIndexPath:indexPath];
    
    cell.imageView.image = [UIImage imageWithContentsOfFile:[thumbArr objectAtIndex:indexPath.row]];
    cell.label.text = [titlesArr objectAtIndex:indexPath.row];
    return cell;
}


- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    currentPage = indexPath.row;
    [self performSegueWithIdentifier:@"contentView" sender:self];
}
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    NSString *str = [NSString stringWithFormat:@"%d",currentPage];
    UIViewController *send = segue.destinationViewController;
    [send setValue:str forKey:@"currentPage"];
    [send setValue:articleArr forKey:@"articles"];
}
@end
