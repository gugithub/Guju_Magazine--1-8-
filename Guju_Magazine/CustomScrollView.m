//
//  CustomScrollView.m
//  Guju_Magazine
//
//  Created by Guju on 13-12-10.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "CustomScrollView.h"
#import "Links_verKVC.h"

@implementation CustomScrollView

- (id)initWithFrame:(CGRect)frame  {
    self = [super initWithFrame:frame];
    if (self) {
        
        count = 0;
        visiblePages = [[NSMutableSet alloc] init];
        recycledPages = [[NSMutableSet alloc] init];
        self.frame = frame;
        self.directionalLockEnabled = YES;
        self.showsHorizontalScrollIndicator = NO;
        self.showsVerticalScrollIndicator = NO;
        self.pagingEnabled = YES;
        self.alwaysBounceHorizontal = YES;
        self.alwaysBounceVertical = YES;
        self.delegate = self;
        self.tag = 1001;
        self.bounces = YES;
        
    }
    return self;
}
- (void)getPictures:(NSArray *)pictureArray links:(NSArray *)linksArray
{
    
    self.contentSize = CGSizeMake(ScreenWidth, ScreenHeight*[pictureArray count]);
    self.contentOffset = CGPointMake(0, 0);

//    if ([picArray count]!=0) {
//        [picArray removeAllObjects];
//        [linkArray removeAllObjects];
//    }
    picArray = [[NSMutableArray alloc]init];
    linkArray = [[NSMutableArray alloc]init];
    webViewArray = [[NSMutableArray alloc] init];
    [picArray addObjectsFromArray:pictureArray];
    [linkArray addObjectsFromArray:linksArray];
    [self loadHTMLWithLinkArr:linkArray];
    [self titlePagesWithFlage:1];
}
#pragma mark - 
#pragma mark -getDetailHTML
- (void)loadHTMLWithLinkArr:(NSArray *)linkArr
{
    NSURL *URL;
//    if ([webViewArray count] != 0) {
//        [webViewArray removeAllObjects];
//    }
    for (NSDictionary *dic in linkArr) {
        Links_verKVC *linkVer = [[Links_verKVC alloc] initWithDic:dic];
        NSString *pageId = linkVer.pageId;
        NSString *x = linkVer.x;
        NSString *y = linkVer.y;
        NSString *width = linkVer.width;
        NSString *height = linkVer.height;
        NSString *action = linkVer.action;

//        UIWebView *HTMLWeb = [[UIWebView alloc] initWithFrame:CGRectMake(x, y, width, height)];
//        [HTMLWeb setFrame:CGRectMake(x, y, width, height)];
//        HTMLWeb.backgroundColor = [UIColor clearColor];
//        HTMLWeb.opaque = NO;
        if ([action hasPrefix:@"file"]) {
            action = [action substringFromIndex:5];
            NSString *htmlPath = [[NSBundle mainBundle] pathForResource:[NSString stringWithFormat:@"259/%@",action] ofType:nil];
            URL = [NSURL fileURLWithPath:htmlPath];
        }else{
            URL =[NSURL URLWithString:action];
        }

        NSMutableDictionary *webDic = [[NSMutableDictionary alloc] init];
        [webDic setValue:pageId forKey:@"pageId"];
        [webDic setValue:URL forKey:@"URL"];
        [webDic setValue:x forKey:@"originX"];
        [webDic setValue:y forKey:@"originY"];
        [webDic setValue:width forKey:@"width"];
        [webDic setValue:height forKey:@"height"];
        [webViewArray addObject:webDic];
    }
    
}
- (UIWebView *)loadDetailHTMLWithPageId:(NSInteger)index
{
    for (NSDictionary *dic in webViewArray) {
        NSString *pageId = [dic objectForKey:@"pageId"];
        if ([pageId intValue] == index) {
            int x = [[dic objectForKey:@"originX"] intValue];
            int y = [[dic objectForKey:@"originY"] intValue];
            int width = [[dic objectForKey:@"width"] intValue];
            int height = [[dic objectForKey:@"height"] intValue];
            UIWebView *HTMLWeb = [[UIWebView alloc] initWithFrame:CGRectMake(x, y, width, height)];
            HTMLWeb.backgroundColor = [UIColor clearColor];
            HTMLWeb.opaque = NO;
            NSURL *URL = [dic objectForKey:@"URL"];
            NSURLRequest *request = [NSURLRequest requestWithURL:URL];
            [HTMLWeb loadRequest:request];
            return HTMLWeb;
        }
    }
//    NSURL *URL;
//    for (NSDictionary *dic in linkArray) {
//        Links_verKVC *linkVer = [[Links_verKVC alloc] initWithDic:dic];
//        NSString *pageId = linkVer.pageId;
//        if ([pageId integerValue] == index) {
//            
//            int x = [linkVer.x intValue];
//            int y = [linkVer.y intValue];
//            int width = [linkVer.width intValue];
//            int height = [linkVer.height intValue];
//            NSString *action = linkVer.action;
//            
//            UIWebView *HTMLWeb = [[UIWebView alloc] initWithFrame:CGRectMake(x, y, width, height)];
//            [HTMLWeb setFrame:CGRectMake(x, y, width, height)];
//            HTMLWeb.backgroundColor = [UIColor clearColor];
//            HTMLWeb.opaque = NO;
//            if ([action hasPrefix:@"file"]) {
//                action = [action substringFromIndex:5];
//                NSString *htmlPath = [[NSBundle mainBundle] pathForResource:[NSString stringWithFormat:@"259/%@",action] ofType:nil];
//                URL = [NSURL fileURLWithPath:htmlPath];
//            }else{
//                URL =[NSURL URLWithString:action];
//            }
//            NSURLRequest *request = [NSURLRequest requestWithURL:URL];
//            [HTMLWeb loadRequest:request];
//            return HTMLWeb;
//        }
//    }

    return nil;
}
#pragma mark -
#pragma mark -scrollview代理方法
- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    if (scrollView.tag == 1001) {
       [self titlePagesWithFlage:0];
    }
}
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
//    int currentPage = (scrollView.contentOffset.y - ScreenHeight/2) / ScreenHeight + 1;
    
}

#pragma mark -
#pragma mark -scrollview重用机制
- (void)titlePagesWithFlage:(NSUInteger)flg
{
    flage = flg;
    
    CGRect visibleBounds = self.bounds;
    int firstNeedPageIndex = floorf(CGRectGetMinY(visibleBounds) / CGRectGetHeight(visibleBounds));
    int lastNeedPageIndex = (CGRectGetMaxY(visibleBounds)-1) / CGRectGetHeight(visibleBounds);
    firstNeedPageIndex = MAX(firstNeedPageIndex, 0);
    lastNeedPageIndex = MIN(lastNeedPageIndex, [picArray count]-1);
//    NSLog(@"%d",firstNeedPageIndex);
//    NSLog(@"%d",lastNeedPageIndex);
    for (CustomImageView *page in visiblePages) {
        if (flage) {
            page.index = 0;
        }
        if (page.index < firstNeedPageIndex || page.index > lastNeedPageIndex || flage) {
            [recycledPages addObject:page];
            for (UIView *view in page.subviews) {
                [view removeFromSuperview];
                
            }
            [page removeFromSuperview];
        }
    }
    
    [visiblePages minusSet:recycledPages];
    for (int index = firstNeedPageIndex; index <= lastNeedPageIndex; index++) {
        if (![self isDisplayingPageForIndex:index]) {
            CustomImageView *page = [self dequeueRecycledPage];
            if (page == nil) {
                page = [[CustomImageView alloc] init];
                page.userInteractionEnabled = YES;
            }
            [self configurePage:page forIndex:index];
            [self addSubview:page];
            [visiblePages addObject:page];
        }
    }
}
- (CustomImageView *)dequeueRecycledPage
{
    CustomImageView *customPage = [recycledPages anyObject];
    if (customPage) {
        [recycledPages removeObject:customPage];
    }
    return customPage;
}
- (BOOL)isDisplayingPageForIndex:(NSUInteger)index
{
    BOOL foundPage = NO;
    if (flage) {
        index = 0;
    }
    for (CustomImageView *page in visiblePages) {
        if (page.index == index) {
            foundPage = YES;
            break;
        }
    }
    return foundPage;
}
- (void)configurePage:(CustomImageView *)page forIndex:(NSUInteger)index
{
    if (flage) {
        index = 0;
    }
    page.index = index;
    UIWebView *web = [self loadDetailHTMLWithPageId:index];
    page.image = [UIImage imageWithContentsOfFile:[picArray objectAtIndex:index]];
    page.frame = CGRectMake(0, ScreenHeight*index, ScreenWidth, ScreenHeight);
    [page addSubview:web];
    
}
- (void)dealloc{
    recycledPages = nil;
    visiblePages = nil;
    picArray = nil;
    linkArray = nil;
    webViewArray = nil;
}
@end
