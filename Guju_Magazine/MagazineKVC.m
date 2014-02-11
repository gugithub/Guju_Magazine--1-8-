//
//  MagazineKVC.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "MagazineKVC.h"

@implementation MagazineKVC
- (id)initWithDic:(NSDictionary *)dic
{
    self = [super init];
    if (self) {
        
        [self setValuesForKeysWithDictionary:dic];
       
    }
    return self;
}
- (void)setValue:(id)value forUndefinedKey:(NSString *)key
{

}
@end
