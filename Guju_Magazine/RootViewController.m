//
//  RootViewController.m
//  Guju_Magazine
//
//  Created by Guju on 13-12-17.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "RootViewController.h"
#import "RightViewController.h"
#import "ViewController.h"

@interface RootViewController ()
{
    UINavigationController *controller;
    UITapGestureRecognizer *tap;
    int flage;
}
@end

@implementation RootViewController

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
    flage = 1;
    self.scrollView.contentSize = CGSizeMake(ScreenWidth*2, ScreenHeight);
    self.scrollView.scrollEnabled = NO;
    
    controller = [self.storyboard instantiateViewControllerWithIdentifier:@"mainView"];
    
    UIButton *rightBt = [UIButton buttonWithType:UIButtonTypeCustom];
    rightBt.frame = CGRectMake(ScreenWidth-50, 2, 40, 40);
    [rightBt addTarget:self action:@selector(displayRightView) forControlEvents:UIControlEventTouchUpInside];
    [rightBt setImage:[UIImage imageNamed:@"btn_navbar_book_disk@2x.png"] forState:UIControlStateNormal];
    [controller.navigationBar addSubview:rightBt];
    
    UIView *view = controller.view;
    view.frame = self.view.bounds;
    view.frame = CGRectOffset(self.scrollView.frame, 0, 0);
    [self.scrollView addSubview:view];

    
    RightViewController *rightVC = [RightViewController sharedRigntVC];
    UIView *view1 = rightVC.view;
    view1.frame = self.view.bounds;
    view1.frame = CGRectOffset(self.scrollView.frame, ScreenWidth, 0);
    [self.scrollView addSubview:view1];

    tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doTap:)];
    tap.delegate = self;
    
    UISwipeGestureRecognizer *swipe1 = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(doSwip:)];
    swipe1.direction = UISwipeGestureRecognizerDirectionLeft;
    [view addGestureRecognizer:swipe1];
    
    UISwipeGestureRecognizer *swipe2 = [[UISwipeGestureRecognizer alloc] initWithTarget:self action:@selector(doSwip:)];
    [view1 addGestureRecognizer:swipe2];
    
}
#pragma mark -
#pragma mark - displayRightView
- (void)displayRightView
{
    UIView *view = [self.scrollView.subviews objectAtIndex:2];
    if (flage) {
        [UIView animateWithDuration:0.5 animations:^{
            [self.scrollView setContentOffset:CGPointMake(668, 0)];
        } completion:^(BOOL finished){
            flage = 0;
            view.userInteractionEnabled = NO;
            [self.view addGestureRecognizer:tap];
        }];
    }else{
        [UIView animateWithDuration:0.5 animations:^{
            [self.scrollView setContentOffset:CGPointMake(0, 0)];
        } completion:^(BOOL finished){
            flage = 1;
            view.userInteractionEnabled = YES;
            [self.view removeGestureRecognizer:tap];
        }];
    }
}
#pragma mark - 
#pragma mark - doSwip:
- (void)doSwip:(UISwipeGestureRecognizer *)swipeGesture
{
    UIView *view = [self.scrollView.subviews objectAtIndex:2];
    if (swipeGesture.direction == UISwipeGestureRecognizerDirectionLeft) {
        [UIView animateWithDuration:0.5 animations:^{
            [self.scrollView setContentOffset:CGPointMake(668, 0)];
        } completion:^(BOOL finished){
            view.userInteractionEnabled = NO;
            [self.view addGestureRecognizer:tap];
        }];

    }else if (swipeGesture.direction == UISwipeGestureRecognizerDirectionRight){
        if (swipeGesture.direction == UISwipeGestureRecognizerDirectionRight) {
            [UIView animateWithDuration:0.5 animations:^{
                [self.scrollView setContentOffset:CGPointMake(0, 0)];
            } completion:^(BOOL finished){
                view.userInteractionEnabled = YES;
                [self.view removeGestureRecognizer:tap];
            }];
        }
    }
    
}
#pragma mark - 
#pragma mark - doTap:
- (void)doTap:(UITapGestureRecognizer *)gesture
{
    
    [UIView animateWithDuration:0.5 animations:^{
        [self.scrollView setContentOffset:CGPointMake(0, 0)];
    } completion:^(BOOL finished){
        UIView *view = [self.scrollView.subviews objectAtIndex:2];
        view.userInteractionEnabled = YES;
        [self.view removeGestureRecognizer:tap];
        flage = 1;
    }];
    

}
#pragma mark - 
#pragma mark - 手势代理
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch
{
    if ([NSStringFromClass([touch.view class]) isEqualToString:@"UIScrollView"] || [NSStringFromClass([touch.view class]) isEqualToString:@"UICollectionView"]) {
        return YES;
    }
    return NO;
}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
