const foodCategoryColumns = [
  {
    text: '谷类及制品',
    value: 'Grains',
    index: 0,
    children: [
      { index: 0, text: '小麦', value: 'Wheat' },
      { index: 1, text: '稻米', value: 'Rice' },
      { index: 2, text: '玉米', value: 'Corn' },
      { index: 3, text: '大麦', value: 'Barley' },
      { index: 4, text: '小米/黄米', value: 'Millet' },
      { index: 5, text: '其它', value: 'Other' }
    ]
  },
  {
    text: '薯类、淀粉及制品',
    value: 'Potatoes_Starch',
    index: 1,
    children: [
      { index: 0, text: '薯类', value: 'Potatoes' },
      { index: 1, text: '淀粉类', value: 'Starch' }
    ]
  },
  {
    text: '干豆类及制品',
    value: 'DryBeans',
    index: 2,
    children: [
      { index: 0, text: '大豆', value: 'Soybeans' },
      { index: 1, text: '绿豆', value: 'GreenBeans' },
      { index: 2, text: '赤豆', value: 'RedBeans' },
      { index: 3, text: '芸豆', value: 'LimaBeans' },
      { index: 4, text: '蚕豆', value: 'FavaBeans' },
      { index: 5, text: '其它', value: 'Other' }
    ]
  },
  {
    text: '蔬菜类及制品',
    value: 'Vegetables',
    index: 3,
    children: [
      { index: 0, text: '根菜类', value: 'RootVegetables' },
      { index: 1, text: '鲜豆类', value: 'FreshBeans' },
      { index: 2, text: '茄果、瓜菜类', value: 'TomatoesMelons' },
      { index: 3, text: '葱蒜类', value: 'OnionsGarlic' },
      { index: 4, text: '嫩茎、叶、花菜类', value: 'StemsLeavesFlowers' },
      { index: 5, text: '水生蔬菜类', value: 'AquaticVegetables' },
      { index: 6, text: '薯芋类', value: 'Tubers' },
      { index: 7, text: '野生蔬菜类', value: 'WildVegetables' }
    ]
  },
  {
    text: '菌藻类',
    value: 'FungiAlgae',
    index: 4,
    children: [
      { index: 0, text: '菌类', value: 'Fungi' },
      { index: 1, text: '藻类', value: 'Algae' }
    ]
  },
  {
    text: '水果类及制品',
    value: 'Fruits',
    index: 5,
    children: [
      { index: 0, text: '仁果类', value: 'DrupeFruits' },
      { index: 1, text: '核果类', value: 'StoneFruits' },
      { index: 2, text: '浆果类', value: 'Berries' },
      { index: 3, text: '柑橘类', value: 'CitrusFruits' },
      { index: 4, text: '热带、亚热带水果', value: 'TropicalFruits' },
      { index: 5, text: '瓜果类', value: 'Melons' }
    ]
  },
  {
    text: '坚果、种子类',
    value: 'NutsSeeds',
    index: 6,
    children: [
      { index: 0, text: '树坚果', value: 'TreeNuts' },
      { index: 1, text: '种子', value: 'Seeds' }
    ]
  },
  {
    text: '畜肉类及制品',
    value: 'MeatProducts',
    index: 7,
    children: [
      { index: 0, text: '猪', value: 'Pork' },
      { index: 1, text: '牛', value: 'Beef' },
      { index: 2, text: '羊', value: 'Lamb' },
      { index: 3, text: '驴', value: 'Donkey' },
      { index: 4, text: '马', value: 'Horse' },
      { index: 5, text: '其它', value: 'Other' }
    ]
  },
  {
    text: '禽肉类及制品',
    value: 'PoultryProducts',
    index: 8,
    children: [
      { index: 0, text: '鸡', value: 'Chicken' },
      { index: 1, text: '鸭', value: 'Duck' },
      { index: 2, text: '鹅', value: 'Goose' },
      { index: 3, text: '火鸡', value: 'Turkey' },
      { index: 4, text: '其它', value: 'Other' }
    ]
  },
  {
    text: '乳类及制品',
    value: 'DairyProducts',
    index: 9,
    children: [
      { index: 0, text: '液态乳', value: 'LiquidMilk' },
      { index: 1, text: '奶粉', value: 'MilkPowder' },
      { index: 2, text: '酸奶', value: 'Yogurt' },
      { index: 3, text: '奶酪', value: 'Cheese' },
      { index: 4, text: '奶油', value: 'Cream' },
      { index: 5, text: '其它', value: 'Other' }
    ]
  },
  {
    text: '蛋类及制品',
    value: 'EggProducts',
    index: 10,
    children: [
      { index: 0, text: '鸡蛋', value: 'ChickenEgg' },
      { index: 1, text: '鸭蛋', value: 'DuckEgg' },
      { index: 2, text: '鹅蛋', value: 'GooseEgg' },
      { index: 3, text: '鹌鹑蛋', value: 'QuailEgg' }
    ]
  },
  {
    text: '鱼虾蟹贝类',
    value: 'Seafood',
    index: 11,
    children: [
      { index: 0, text: '鱼', value: 'Fish' },
      { index: 1, text: '虾', value: 'Shrimp' },
      { index: 2, text: '蟹', value: 'Crab' },
      { index: 3, text: '贝', value: 'Shellfish' },
      { index: 4, text: '其它', value: 'Other' }
    ]
  },
  {
    text: '婴幼儿食品',
    value: 'BabyFood',
    index: 12,
    children: [
      { index: 0, text: '婴幼儿配方粉', value: 'InfantFormula' },
      { index: 1, text: '婴幼儿断奶期辅助食品', value: 'WeaningAids' },
      { index: 2, text: '婴幼儿补充食品', value: 'SupplementaryFood' }
    ]
  },
  {
    text: '小吃、甜饼',
    value: 'SnacksCakes',
    index: 13,
    children: [
      { index: 0, text: '小吃', value: 'Snacks' },
      { index: 1, text: '蛋糕、甜点', value: 'CakesDesserts' }
    ]
  },
  {
    text: '速食食品',
    value: 'FastFood',
    index: 14,
    children: [
      { index: 0, text: '快餐食品', value: 'FastFoodMeals' },
      { index: 1, text: '方便食品', value: 'ConvenienceFood' },
      { index: 2, text: '休闲食品', value: 'Snacks' }
    ]
  },
  {
    text: '饮料类',
    value: 'Beverages',
    index: 15,
    children: [
      { index: 0, text: '碳酸饮料', value: 'CarbonatedBeverages' },
      { index: 1, text: '果汁及果汁饮料', value: 'FruitJuicesAndBeverages' },
      { index: 2, text: '蔬菜汁饮料', value: 'VegetableJuiceBeverages' },
      { index: 3, text: '含乳饮料', value: 'DairyBeverages' },
      { index: 4, text: '植物蛋白饮料', value: 'PlantProteinBeverages' },
      { index: 5, text: '固体饮料', value: 'SolidBeverages' },
      { index: 6, text: '棒冰、冰淇凌类', value: 'PopsiclesAndIceCreams' },
      { index: 7, text: '茶叶及茶饮料', value: 'TeaAndTeaBeverages' }
    ]
  },
  {
    text: '含酒精饮料',
    value: 'AlcoholicBeverages',
    index: 16,
    children: [
      { index: 0, text: '发酵酒', value: 'FermentedWine' },
      { index: 1, text: '蒸馏酒', value: 'DistilledSpirits' },
      { index: 2, text: '露酒（配制酒）', value: 'LiqueursAndCordials' }
    ]
  },
  {
    text: '糖、果脯和蜜饯、蜂蜜',
    value: 'SugarConfectioneryHoney',
    index: 17,
    children: [
      { index: 0, text: '糖', value: 'Sugar' },
      { index: 1, text: '糖果', value: 'Candy' },
      { index: 2, text: '果脯和蜜饯', value: 'DriedFruitsAndPreserves' },
      { index: 3, text: '蜂蜜', value: 'Honey' }
    ]
  },
  {
    text: '油脂类',
    value: 'FatsAndOils',
    index: 18,
    children: [
      { index: 0, text: '动物油脂', value: 'AnimalFats' },
      { index: 1, text: '植物油', value: 'VegetableOils' }
    ]
  },
  {
    text: '调味品类',
    value: 'Seasonings',
    index: 19,
    children: [
      { index: 0, text: '酱油', value: 'SoySauce' },
      { index: 1, text: '醋', value: 'Vinegar' },
      { index: 2, text: '酱', value: 'Sauces' },
      { index: 3, text: '腐乳', value: 'FermentedTofu' },
      { index: 4, text: '咸菜类', value: 'Pickles' },
      { index: 5, text: '辛香料', value: 'Spices' },
      { index: 6, text: '盐、味精及其它', value: 'SaltMSGAndOthers' }
    ]
  },
  {
    text: '其它',
    value: 'Other',
    index: 20,
    children: [{ index: 0, text: '其它', value: 'Other' }]
  }
]

export default foodCategoryColumns
