//
//  ArticlesKVC.h
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ArticlesKVC : NSObject
{
    @public
    NSString *thumb_ver;
    NSString *nav_ver;
    NSArray *pdf_ver;
    NSArray *links_ver;
}
@property (nonatomic, strong) NSString *id;
@property (nonatomic, strong) NSString *url;
@property (nonatomic, strong) NSString *title;
@property (nonatomic, strong) NSString *author;
@property (nonatomic, strong) NSString *intro;


- (id)initWithDic:(NSDictionary *)dic;
@end
