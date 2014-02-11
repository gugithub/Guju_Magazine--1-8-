//
//  RightViewController.h
//  Guju_Magazine
//
//  Created by Guju on 13-12-16.
//  Copyright (c) 2013年 Guju. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Entity.h"
#import "RightVCCollectionViewCell.h"
@interface RightViewController : UIViewController <UICollectionViewDataSource,UICollectionViewDelegate>

@property (strong, nonatomic) IBOutlet UICollectionView *collectionView;
@property (strong, nonatomic) Entity *text;
@property (strong, nonatomic) NSMutableArray *datas;
@property (strong, nonatomic) NSArray *articles;
+ (RightViewController *)sharedRigntVC;
- (void)loadData;
@end
