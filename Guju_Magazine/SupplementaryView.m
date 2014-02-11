//
//  SupplementaryView.m
//  Guju_Magazine
//
//  Created by Guju on 13-11-27.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "SupplementaryView.h"

@implementation SupplementaryView

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self addSubview:self.imageView1];
        [self addSubview:self.imageView2];
        [self addSubview:self.latestMagazine];
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
