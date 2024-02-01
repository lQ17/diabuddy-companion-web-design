const foodCategoryColumns = [
  {
    text: '谷类及制品',
    value: 'Grains',
    children: [
      { text: '小麦', value: 'Wheat' },
      { text: '稻米', value: 'Rice' },
      { text: '玉米', value: 'Corn' },
      { text: '大麦', value: 'Barley' },
      { text: '小米/黄米', value: 'Millet' },
      { text: '其它', value: 'Other' }
    ]
  },
  {
    text: '薯类、淀粉及制品',
    value: 'Potatoes_Starch',
    children: [
      { text: '薯类', value: 'Potatoes' },
      { text: '淀粉类', value: 'Starch' }
    ]
  },
  {
    text: '干豆类及制品',
    value: 'DryBeans',
    children: [
      { text: '大豆', value: 'Soybeans' },
      { text: '绿豆', value: 'GreenBeans' },
      { text: '赤豆', value: 'RedBeans' },
      { text: '芸豆', value: 'LimaBeans' },
      { text: '蚕豆', value: 'FavaBeans' },
      { text: '其它', value: 'Other' }
    ]
  },
  {
    text: '蔬菜类及制品',
    value: 'Vegetables',
    children: [
      { text: '根菜类', value: 'RootVegetables' },
      { text: '鲜豆类', value: 'FreshBeans' },
      { text: '茄果、瓜菜类', value: 'TomatoesMelons' },
      { text: '葱蒜类', value: 'OnionsGarlic' },
      { text: '嫩茎、叶、花菜类', value: 'StemsLeavesFlowers' },
      { text: '水生蔬菜类', value: 'AquaticVegetables' },
      { text: '薯芋类', value: 'Tubers' },
      { text: '野生蔬菜类', value: 'WildVegetables' }
    ]
  },
  {
    text: '菌藻类',
    value: 'FungiAlgae',
    children: [
      { text: '菌类', value: 'Fungi' },
      { text: '藻类', value: 'Algae' }
    ]
  },
  {
    text: '水果类及制品',
    value: 'Fruits',
    children: [
      { text: '仁果类', value: 'DrupeFruits' },
      { text: '核果类', value: 'StoneFruits' },
      { text: '浆果类', value: 'Berries' },
      { text: '柑橘类', value: 'CitrusFruits' },
      { text: '热带、亚热带水果', value: 'TropicalFruits' },
      { text: '瓜果类', value: 'Melons' }
    ]
  },
  {
    text: '坚果、种子类',
    value: 'NutsSeeds',
    children: [
      { text: '树坚果', value: 'TreeNuts' },
      { text: '种子', value: 'Seeds' }
    ]
  },
  {
    text: '畜肉类及制品',
    value: 'MeatProducts',
    children: [
      { text: '猪', value: 'Pork' },
      { text: '牛', value: 'Beef' },
      { text: '羊', value: 'Lamb' },
      { text: '驴', value: 'Donkey' },
      { text: '马', value: 'Horse' },
      { text: '其它', value: 'Other' }
    ]
  },
  {
    text: '禽肉类及制品',
    value: 'PoultryProducts',
    children: [
      { text: '鸡', value: 'Chicken' },
      { text: '鸭', value: 'Duck' },
      { text: '鹅', value: 'Goose' },
      { text: '火鸡', value: 'Turkey' },
      { text: '其它', value: 'Other' }
    ]
  },
  {
    text: '乳类及制品',
    value: 'DairyProducts',
    children: [
      { text: '液态乳', value: 'LiquidMilk' },
      { text: '奶粉', value: 'MilkPowder' },
      { text: '酸奶', value: 'Yogurt' },
      { text: '奶酪', value: 'Cheese' },
      { text: '奶油', value: 'Cream' },
      { text: '其它', value: 'Other' }
    ]
  },
  {
    text: '蛋类及制品',
    value: 'EggProducts',
    children: [
      { text: '鸡蛋', value: 'ChickenEgg' },
      { text: '鸭蛋', value: 'DuckEgg' },
      { text: '鹅蛋', value: 'GooseEgg' },
      { text: '鹌鹑蛋', value: 'QuailEgg' }
    ]
  },
  {
    text: '鱼虾蟹贝类',
    value: 'Seafood',
    children: [
      { text: '鱼', value: 'Fish' },
      { text: '虾', value: 'Shrimp' },
      { text: '蟹', value: 'Crab' },
      { text: '贝', value: 'Shellfish' },
      { text: '其它', value: 'Other' }
    ]
  },
  {
    text: '婴幼儿食品',
    value: 'BabyFood',
    children: [
      { text: '婴幼儿配方粉', value: 'InfantFormula' },
      { text: '婴幼儿断奶期辅助食品', value: 'WeaningAids' },
      { text: '婴幼儿补充食品', value: 'SupplementaryFood' }
    ]
  },
  {
    text: '小吃、甜饼',
    value: 'SnacksCakes',
    children: [
      { text: '小吃', value: 'Snacks' },
      { text: '蛋糕、甜点', value: 'CakesDesserts' }
    ]
  },
  {
    text: '速食食品',
    value: 'FastFood',
    children: [
      { text: '快餐食品', value: 'FastFoodMeals' },
      { text: '方便食品', value: 'ConvenienceFood' },
      { text: '休闲食品', value: 'Snacks' }
    ]
  },
  {
    text: '饮料类',
    value: 'Beverages',
    children: [
      { text: '碳酸饮料', value: 'CarbonatedBeverages' },
      { text: '果汁及果汁饮料', value: 'FruitJuicesAndBeverages' },
      { text: '蔬菜汁饮料', value: 'VegetableJuiceBeverages' },
      { text: '含乳饮料', value: 'DairyBeverages' },
      { text: '植物蛋白饮料', value: 'PlantProteinBeverages' },
      { text: '固体饮料', value: 'SolidBeverages' },
      { text: '棒冰、冰淇凌类', value: 'PopsiclesAndIceCreams' },
      { text: '茶叶及茶饮料', value: 'TeaAndTeaBeverages' }
    ]
  },
  {
    text: '含酒精饮料',
    value: 'AlcoholicBeverages',
    children: [
      { text: '发酵酒', value: 'FermentedWine' },
      { text: '蒸馏酒', value: 'DistilledSpirits' },
      { text: '露酒（配制酒）', value: 'LiqueursAndCordials' }
    ]
  },
  {
    text: '糖、果脯和蜜饯、蜂蜜',
    value: 'SugarConfectioneryHoney',
    children: [
      { text: '糖', value: 'Sugar' },
      { text: '糖果', value: 'Candy' },
      { text: '果脯和蜜饯', value: 'DriedFruitsAndPreserves' },
      { text: '蜂蜜', value: 'Honey' }
    ]
  },
  {
    text: '油脂类',
    value: 'FatsAndOils',
    children: [
      { text: '动物油脂', value: 'AnimalFats' },
      { text: '植物油', value: 'VegetableOils' }
    ]
  },
  {
    text: '调味品类',
    value: 'Seasonings',
    children: [
      { text: '酱油', value: 'SoySauce' },
      { text: '醋', value: 'Vinegar' },
      { text: '酱', value: 'Sauces' },
      { text: '腐乳', value: 'FermentedTofu' },
      { text: '咸菜类', value: 'Pickles' },
      { text: '辛香料', value: 'Spices' },
      { text: '盐、味精及其它', value: 'SaltMSGAndOthers' }
    ]
  },
  {
    text: '其它',
    value: 'Other',
    children: [
      {
        text: '其它',
        value: 'Other'
      }
    ]
  }
]

export default foodCategoryColumns
