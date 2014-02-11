//
//  ArticlesKVC.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "ArticlesKVC.h"

@implementation ArticlesKVC
- (id)initWithDic:(NSDictionary *)dic
{
    self = [super init];
    if (self) {
//        [self setValue:[dic objectForKey:@"title"] forKey:@"title"];
        [self setValue:[dic objectForKey:@"pdf-ver"] forKey:@"pdf_ver"];
        [self setValue:[dic objectForKey:@"thumb-ver"] forKey:@"thumb_ver"];
        [self setValue:[dic objectForKey:@"nav-ver"] forKey:@"nav_ver"];
        [self setValue:[dic objectForKey:@"links-ver"] forKey:@"links_ver"];
        [self setValuesForKeysWithDictionary:dic];
    }
    return self;
}
- (void)setValue:(id)value forUndefinedKey:(NSString *)key
{

}
@end
