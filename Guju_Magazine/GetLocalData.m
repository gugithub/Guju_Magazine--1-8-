//
//  GetLocalData.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "GetLocalData.h"

@implementation GetLocalData
- (id)initWithBlock:(DataBlock)block
{
    self = [super init];
    if (self) {
        _dataBlock = [block copy];
    }
    return self;
}
- (void)getLocalDataWithFileName:(NSString *)fileName
{
//    NSString *documentPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
//    NSString *filePath = [documentPath stringByAppendingPathComponent:@"259/magazine.json"];
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"259/magazine.json" ofType:nil];
    NSData *data = [NSData dataWithContentsOfFile:filePath];
	_dataBlock(data);
}
@end
