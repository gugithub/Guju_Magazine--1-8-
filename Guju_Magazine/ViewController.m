//
//  ViewController.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-20.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "ViewController.h"
#import "GetLocalData.h"
#import "MagazineKVC.h"
#import "CustomCollectionCell.h"
#import "SupplementaryView.h"
#import "AppDelegate.h"
#import "RightViewController.h"

@interface ViewController ()
{
    NSMutableArray *titleArr;
    NSMutableArray *articlesArr;
    NSArray *months;
    NSInteger flage;
    
    RightViewController *controller;
    NSString *currentPage;
}
@end

@implementation ViewController
- (void)viewWillAppear:(BOOL)animated
{
}
- (void)viewDidLoad
{
    [super viewDidLoad];
    flage = 1;
    NSLog(@"444");
    currentPage = nil;
    self.collectionView.backgroundColor = [UIColor colorWithPatternImage:[UIImage imageNamed:@"bg_carpet@2x.png"]];
    
    titleArr = [NSMutableArray array];
    articlesArr = [NSMutableArray array];
    months = [NSArray arrayWithObjects:@"11",@"10",@"9",@"8",@"7",@"6", nil];

    [self.collectionView registerClass:[CustomCollectionCell class]  forCellWithReuseIdentifier:@"reuse"];

    [self.navigationController.navigationBar setBackgroundImage:[UIImage imageNamed:@"bg_wood@2x.png"] forBarMetrics:UIBarMetricsDefault];
    UILabel *title = [[UILabel alloc] initWithFrame:CGRectMake(364, 2, 40, 40)];
    [title setFont:[UIFont fontWithName:@"SnellRoundhand-Black" size:30]];
    title.text = @"谷 居";
    self.navigationItem.titleView = title;
    
    UIButton *leftBt = [UIButton buttonWithType:UIButtonTypeCustom];
    leftBt.frame = CGRectMake(20, 2, 40, 40);
    [leftBt setImage:[UIImage imageNamed:@"btn_setting@2x.png"] forState:UIControlStateNormal];
    [self.navigationController.navigationBar addSubview:leftBt];
    
//    UIButton *rightBt = [UIButton buttonWithType:UIButtonTypeCustom];
//    rightBt.frame = CGRectMake(ScreenWidth-50, 2, 40, 40);
//    [rightBt addTarget:self action:@selector(displayRightView) forControlEvents:UIControlEventTouchUpInside];
//    [rightBt setImage:[UIImage imageNamed:@"btn_navbar_book_disk@2x.png"] forState:UIControlStateNormal];
//    [self.navigationController.navigationBar addSubview:rightBt];
    
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
#pragma mark - 
#pragma mark -displayRightView
- (void)displayRightView
{
    UIScrollView *scrollView = (UIScrollView *)self.navigationController.view.superview;
    if (flage) {

        [UIView animateWithDuration:0.5 animations:^{
            [scrollView setContentOffset:CGPointMake(668, 0)];
        } completion:^(BOOL finished){
            flage = 0;
            self.view.userInteractionEnabled = NO;
        }];
    }else{
        [UIView animateWithDuration:0.5 animations:^{
            [scrollView setContentOffset:CGPointMake(0, 0)];
        } completion:^(BOOL finished){
            flage = 1;
            self.view.userInteractionEnabled = YES;
        }];
    }
}

#pragma mark - 
#pragma mark -collectionView 代理方法
- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return 6;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *identifier = @"reuse";
    CustomCollectionCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:identifier forIndexPath:indexPath];
    NSString *month = [months objectAtIndex:indexPath.row];
    cell.imageView.image = [UIImage imageNamed:@"thumb-ver.jpg"];
    cell.label.text = [NSString stringWithFormat:@"%@月刊",month];

    return cell;
}
- (UICollectionReusableView *)collectionView:(UICollectionView *)collectionView viewForSupplementaryElementOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath
{
    SupplementaryView *header = nil;
    if ([kind isEqual:UICollectionElementKindSectionHeader]) {
        header = [collectionView dequeueReusableSupplementaryViewOfKind:kind withReuseIdentifier:@"reuse1" forIndexPath:indexPath];
        header.imageView1.image = [UIImage imageNamed:@"bg_bookself_year_2013@2x.png"];
        header.imageView2.image = [UIImage imageNamed:@"bg_bookself_sep.png"];
        header.latestMagazine.image = [UIImage imageNamed:@"thumb-ver.jpg"];
    }
    return header;
}
- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    if ([articlesArr count] == 0) {
        [self reloadData];
    }
    [self performSegueWithIdentifier:@"contentView" sender:self];
}
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    UIViewController *send = segue.destinationViewController;
    [send setValue:currentPage forKey:@"currentPage"];
    [send setValue:articlesArr forKey:@"articles"];
}
- (void)reloadData
{
    GetLocalData *localData = [[GetLocalData alloc] initWithBlock:^(NSData *data){
        NSArray *dataArr = [[NSJSONSerialization JSONObjectWithData:data options:0 error:nil] objectForKey:@"sections"];
        for (NSDictionary *dic in dataArr) {
            MagazineKVC *magazine = [[MagazineKVC alloc] initWithDic:dic];
            [titleArr addObject:magazine.title];
            [articlesArr addObject:magazine.articles];
        }
    }];
    [localData getLocalDataWithFileName:nil];
}
@end
