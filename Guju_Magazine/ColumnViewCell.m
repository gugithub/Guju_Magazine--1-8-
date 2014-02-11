//
//  ColumnViewCell.m
//  Guju_Magazine
//
//  Created by Guju on 13-12-12.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import "ColumnViewCell.h"

@implementation ColumnViewCell

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        self.imgView = [[UIImageView alloc] initWithFrame:CGRectMake(30, 30, 168, 224)];
        [self.contentView addSubview:self.imgView];
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(30, 254, 168, 30)];
        self.label.textColor = [UIColor whiteColor];
        self.label.textAlignment = NSTextAlignmentCenter;
        [self.contentView addSubview:self.label];
        
    }
    return self;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated
{
    [super setSelected:selected animated:animated];
//    self.imgView.layer.borderColor = [UIColor redColor].CGColor;
//    self.imgView.layer.borderWidth = 10;
    // Configure the view for the selected state
}

@end
