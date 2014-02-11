//
//  Links_verKVC.h
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Links_verKVC : NSObject
@property (nonatomic, strong) NSString *action;
@property (nonatomic, strong) NSString *pageId;
@property (nonatomic, strong) NSString *x;
@property (nonatomic, strong) NSString *y;
@property (nonatomic, strong) NSString *width;
@property (nonatomic, strong) NSString *height;

- (id)initWithDic:(NSDictionary *)dic;
@end
