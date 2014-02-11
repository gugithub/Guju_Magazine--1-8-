//
//  CustomCollectionCell.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-26.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "CustomCollectionCell.h"

@implementation CustomCollectionCell

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {

        self.imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, self.bounds.size.width, 307)];
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(0, 307, self.bounds.size.width, 30)];
        self.label.textAlignment = NSTextAlignmentCenter;
        [self.label setFont:[UIFont fontWithName:@"Thonburi-Bold" size:20]];
        [self addSubview:self.label];
        [self addSubview:self.imageView];
    }
    return self;
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
