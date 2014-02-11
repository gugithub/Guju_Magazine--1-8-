//
//  RootViewController.h
//  Guju_Magazine
//
//  Created by Guju on 13-12-17.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RootViewController : UIViewController <UIGestureRecognizerDelegate>
{
    NSMutableArray *viewControllerArray;
}
@property (strong, nonatomic) IBOutlet UIScrollView *scrollView;

@end
