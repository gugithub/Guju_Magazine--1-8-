//
//  CustomScrollView.h
//  Guju_Magazine
//
//  Created by Guju on 13-12-10.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CustomImageView.h"

@interface CustomScrollView : UIScrollView <UIScrollViewDelegate>
{
    
    NSMutableArray *picArray;
    NSMutableArray *linkArray;
    NSMutableSet *visiblePages;
    NSMutableSet *recycledPages;
//    UIWebView *HTMLWeb;
    NSMutableArray *webViewArray;
    NSInteger flage;
    int count;
}
    
@property (nonatomic, assign)NSUInteger index;

- (void)getPictures:(NSArray *)pictureArray links:(NSArray *)linksArray;
@end
