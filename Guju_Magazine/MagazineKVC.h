//
//  MagazineKVC.h
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MagazineKVC : NSObject
@property (nonatomic, strong) NSString *title;
@property (nonatomic, strong) NSArray *articles;
- (id)initWithDic:(NSDictionary *)dic;
@end
