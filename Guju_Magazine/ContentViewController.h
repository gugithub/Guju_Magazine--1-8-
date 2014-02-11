//
//  ContentViewController.h
//  Guju_Magazine
//
//  Created by Guju on 13-11-20.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CustomScrollView.h"
#import "UIColumnView.h"

@interface ContentViewController : UIViewController<UIScrollViewDelegate,UIGestureRecognizerDelegate,UIColumnViewDelegate,UIColumnViewDataSource>

@property (strong, nonatomic) IBOutlet UIScrollView *horizontalScroll;
@property (strong, nonatomic) NSArray *articles;
@property (strong, nonatomic) NSString *currentPage;

@end
