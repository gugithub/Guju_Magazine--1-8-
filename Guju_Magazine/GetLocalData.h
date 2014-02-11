//
//  GetLocalData.h
//  Guju_Magazine
//
//  Created by Guju on 13-11-21.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef void (^DataBlock)(NSData *data);
@interface GetLocalData : NSObject
{
    DataBlock _dataBlock;
}
- (id)initWithBlock:(DataBlock)block;
- (void)getLocalDataWithFileName:(NSString *)fileName;
@end
