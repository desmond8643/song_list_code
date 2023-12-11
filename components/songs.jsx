import { getSongs } from './Database/FirebaseAccount'
import React from 'react'


export function songsToArray() {
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    async function databaseSongs() {
      try {
        const songsData = await getSongs();
        setSongs(songsData);
      } catch (error) {
        console.log('Error retrieving songs:', error);
      }
    }
    databaseSongs();
  }, []);
  
  const updatedSongsArray = songs.map((song) => {
    const tagsArray = song.tags.split(',').map((tag) => tag.trim());
    const updatedChart = getChartType(song.chart);

    return {
      ...song,
      tags: tagsArray,
      chart: updatedChart,
    }
  })
  return updatedSongsArray
}

export default [
  {
    id: 'lanceexpert',
    title: 'Lance',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['交互', '右手'],
    youtube: '',
    dxscore: 1767
  },
  {
    id: 'starrycolorsexpert',
    title: 'Starry Colors',
    difficulty: 'Expert',
    level: 11,
    chart: getChartType('d'),
    tags: ['交互', '右手'],
    youtube: 'https://youtu.be/xdjCJrNIfpc',
    dxscore: 1563
  },
  {
    id: 'bluezoneexpert',
    title: 'Blue Zone',
    difficulty: 'Master',
    level: 14,
    chart: getChartType('d'),
    tags: ['交互', '迴轉', '微縱連'],
    youtube: 'https://youtu.be/l7F0eiSNmGU',
    dxscore: 2664

  },
  {
    id: 'alcyoneexpert',
    title: 'Alcyone',
    difficulty: 'Expert',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '迴轉', '右手'],
    youtube: 'https://youtu.be/GT7nL0aOzB0',
    dxscore: 1905
  },
  {
    id: 'meijinmanexpert',
    title: 'タカハせ！名人マン',
    difficulty: 'Expert',
    level: 9.5,
    chart: getChartType('s'),
    tags: ['縱連'],
    youtube: 'https://youtu.be/_RuiB0iHPuY',
    dxscore: 1149
  },
  {
    id: 'madridexpert',
    title: 'アージェントシンメトリー',
    difficulty: 'Expert',
    level: 10.5,
    chart: getChartType('s'),
    tags: ['交互', '迴轉'],
    youtube: '',
    dxscore: 1500
  },
  {
    id: 'usateiexpert',
    title: 'ウサテイ',
    difficulty: 'Expert',
    level: 10.5,
    chart: getChartType('s'),
    tags: ['縱連', 'Each'],
    youtube: 'https://youtu.be/E9GArL5UqwY',
    dxscore: 1395
  },
  {
    id: 'incarnationmaster',
    title: 'リンカーネイション',
    difficulty: 'Master',
    level: 13.5,
    chart: getChartType('s'),
    tags: ['左手', '交互', 'Each'],
    youtube: 'https://youtu.be/d1jIh0B4q6c',
    dxscore: 2583
  },
  {
    id: 'sayonaramaster',
    title: 'サヨナラチェーンソー',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '3下'],
    youtube: 'https://youtu.be/3ywpjTs85YE',
    dxscore: 2322
  },
  {
    id: 'strobegirlmaster',
    title: 'Strobe Girl',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '3下', '跳音', '單手', '副音+Each', '右手'],
    youtube: 'https://youtu.be/3wp6WTbHFU4',
    dxscore: 1791
  },
  {
    id: 'shiawaseexpert',
    title: '幸せになれる隠しコマンドがあるらしい',
    difficulty: 'Expert',
    level: 12.5,
    chart: getChartType('s'),
    tags: ['交互', 'Each', '單手', '右手'],
    youtube: 'https://youtu.be/rE3_j5LMB8A',
    dxscore: 1614
  },
  {
    id: 'matoryoshikamaster',
    title: 'マトリョシカ',
    difficulty: 'Master',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['硬幹', 'Each', '單手'],
    youtube: '',
    dxscore: 1362
  },
  {
    id: 'yorugaoexpert',
    title: 'Yorugao',
    difficulty: 'Expert',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '跳音', '單手', '右手'],
    youtube: 'https://youtu.be/FGeo5XDmuVU',
    dxscore: 1824
  },
  {
    id: 'noentrymaster',
    title: '立ち入り禁止',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('s'),
    tags: ['交互', '跳音', '單手', '右手'],
    youtube: 'https://youtu.be/J6_UjBApsWQ',
    dxscore: 2304
  },
  {
    id: 'departtimeexpert',
    title: 'デンパラダイム',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('d'),
    tags: ['硬幹', '副音+Each'],
    youtube: 'https://youtu.be/VH8XmFnRJ-0',
    dxscore: 2112
  },
  {
    id: 'the90sdeisionexpert',
    title: `The 90's Decision`,
    difficulty: 'Expert',
    level: 11,
    chart: getChartType('d'),
    tags: ['交互'],
    youtube: 'https://youtu.be/so8hQFaehPE',
    dxscore: 1578
  },
  {
    id: 'dunzhenhanexpert',
    title: '頓珍漢の宴',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['Each', '副音+Each'],
    youtube: 'https://youtu.be/xgO6_iqjPvY',
    dxscore: 1923
  },
  {
    id: 'maxrageexpert',
    title: 'MAXRAGE',
    difficulty: 'Expert',
    level: 11,
    chart: getChartType('d'),
    tags: ['交互', '微縱連', '右手'],
    youtube: 'https://youtu.be/Rt1M_c5SjME',
    dxscore: 2019
  },
  {
    id: 'magicgirlchocolateexpert',
    title: '魔法少女とチョコレゐト',
    difficulty: 'Expert',
    level: 9,
    chart: getChartType('d'),
    tags: ['Each'],
    youtube: 'https://youtu.be/5JbqsrwQ-vo',
    dxscore: 1110
  },
  {
    id: 'deepseagirlmasterst',
    title: '深海少女',
    difficulty: 'Master',
    level: 13,
    chart: getChartType('s'),
    tags: ['交互', '3下', '右手'],
    youtube: '',
    dxscore: 1731

  },
  {
    id: 'xiangsichuangaiexpert',
    title: '相思創愛',
    difficulty: 'Expert',
    level: 11,
    chart: getChartType('s'),
    tags: ['交互', '副音+Each'],
    youtube: '',
    dxscore: 1521
  },
  {
    id: 'kerodestinyexpert',
    title: 'ケロ⑨destiny',
    difficulty: 'Expert',
    level: 10.5,
    chart: getChartType('s'),
    tags: ['Hold', '單手'],
    youtube: 'https://youtu.be/MBSsOI0oMHE',
    dxscore: 1272
  },
  {
    id: 'gongganjueexpert',
    title: '共感覚おばけ',
    difficulty: 'Expert',
    level: 10.5,
    chart: getChartType('s'),
    tags: ['交互', '副音+Each', 'Each'],
    youtube: 'https://youtu.be/Ex4StvareNk',
    dxscore: 1329
  },
  {
    id: 'sanbarandoexpertdx',
    title: 'サンバランド',
    difficulty: 'Expert',
    level: 10.5,
    chart: getChartType('d'),
    tags: ['縱連', '跳音', 'Each'],
    youtube: 'https://youtu.be/mCwTYcwbZF0',
    dxscore: 1506
  },
  {
    id: 'ignisdansemaster',
    title: 'Ignis Danse',
    difficulty: 'Master',
    level: 14,
    chart: getChartType('s'),
    tags: ['跳音', '拍滑', '交互', '避判', '右手'],
    youtube: 'https://youtu.be/YdwElzPxUVs',
    dxscore: 2997
  },
  {
    id: 'virtualtolivemaster',
    title: 'Virtual to LIVE',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('d'),
    tags: ['跳音', 'Each', '避判'],
    youtube: 'https://youtu.be/kR6n8dVN8Mk',
    dxscore: 1908
  },
  {
    id: 'hotlimitmaster',
    title: 'HOT LIMIT',
    difficulty: 'Master',
    level: 11.5,
    chart: getChartType('d'),
    tags: ['交互', '微縱連', 'Each', '拍滑', '單手', '右手'],
    youtube: 'https://youtu.be/x-sr44YDnEY',
    dxscore: 1689
  },
  {
    id: 'halcyonexpertst',
    title: 'Halcyon',
    difficulty: 'Expert',
    level: 12,
    chart: getChartType('s'),
    tags: ['交互', '3下', 'Each', '迴轉', '單手', '左手'],
    youtube: 'https://youtu.be/GKqSf19nFJ0',
    dxscore: 2160
  },
  {
    id: 'dragoonexpert',
    title: 'Dragoon',
    difficulty: 'Expert',
    level: 10.5,
    chart: getChartType('s'),
    tags: ['交互', '右手', '微縱連', '縱連', 'Each'],
    youtube: '',
    dxscore: 1536
  },
  {
    id: 'magicgirlchocoloatemaster',
    title: '魔法少女とチョコレゐト',
    difficulty: 'Master',
    level: 13,
    chart: getChartType('d'),
    tags: ['微縱連', '跳音', '單手', '拍滑'],
    youtube: 'https://youtu.be/6Xy4Vgxmym8',
    dxscore: 1860
  },
  {
    id: 'rouwaremaster',
    title: 'ロウワー',
    difficulty: 'Re:Master',
    level: 13,
    chart: getChartType('d'),
    tags: ['跳音', '海底潭'],
    youtube: 'https://youtu.be/mB4bvm4eB4o',
    dxscore: 2277
  },
  {
    id: 'oshamascrambleexpertst',
    title: 'Oshama Scramble',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['交互', '單手', '右手'],
    youtube: 'https://youtu.be/5hZGqtKWeuw',
    dxscore: 1782

  },
  {
    id: 'infinityexpert',
    title: '[X]',
    difficulty: 'Expert',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '避判', '跳音', '右手'],
    youtube: 'https://youtu.be/Z75b60BrtmE',
    dxscore: 1899
  },
  {
    id: 'milkexpert',
    title: 'MilK',
    difficulty: 'Expert',
    level: 12,
    chart: getChartType('s'),
    tags: ['交互', '微縱連', '單手'],
    youtube: 'https://youtu.be/wz-BFdHzaus',
    dxscore: 1653
  },
  {
    id: 'mutationmaster',
    title: 'Mutation',
    difficulty: 'Master',
    level: 14,
    chart: getChartType('d'),
    tags: ['交互', 'Each', '微縱連', '迴轉'],
    youtube: 'https://youtu.be/yrh5hUpil3M',
    dxscore: 2973
  },
  {
    id: 'fujinrumbleexpert',
    title: 'Fujin Rumble',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['交互', '縱連', '微縱連', '右手'],
    youtube: 'https://youtu.be/Pgq_-zHNbgg',
    dxscore: 1527
  },
  {
    id: 'shakeitmaster',
    title: 'shake it!',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('s'),
    tags: ['Each', 'Slide', '單手'],
    youtube: '',
    dxscore: 1491
  },
  {
    id: 'gardenofthedragonexpert',
    title: 'Garden Of The Dragon',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['交互', '微縱連'],
    youtube: 'https://youtu.be/7Qi9eL9YwBU',
    dxscore: 1575
  },
  {
    id: 'meteormaster',
    title: 'METEOR',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '左手', '單手', 'Slide'],
    youtube: 'https://youtu.be/uh57CKAGtto',
    dxscore: 1632
  },
  {
    id: 'dakarapanwomaster',
    title: 'だからパンを焼いたんだ',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('d'),
    tags: ['交互', '單手'],
    youtube: 'https://youtu.be/j5qhHEmAji0',
    dxscore: 2403
  },
  {
    id: 'dontfightthemusicmaster',
    title: 'Don\'t Fight The Music',
    difficulty: 'Master',
    level: 14,
    chart: getChartType('d'),
    tags: ['交互', '微縱連', '迴轉', '海底潭', '避判', '單手', '拍滑', 'Each'],
    youtube: 'https://youtu.be/l2ErxBj16UQ',
    dxscore: 3267
  },
  {
    id: 'desperateexpert',
    title: 'デスパレイト',
    difficulty: 'Expert',
    level: 11.5,
    chart: getChartType('s'),
    tags: ['交互', 'Each', '單手', '右手', '副音+Each'],
    youtube: 'https://youtu.be/XmaLn83Zl3E',
    dxscore: 1434
  },
  {
    id: 'daddymulkexpert',
    title: 'DADDY MULK -Groove remix-',
    difficulty: 'Expert',
    level: 11,
    chart: getChartType('s'),
    tags: ['交互', '單手', '右手'],
    youtube: 'https://youtu.be/pa4KTzL-ASs',
    dxscore: 1338
  },
  {
    id: 'soundchimeraexpert',
    title: 'Sound Chimera',
    difficulty: 'Expert',
    level: 12,
    chart: getChartType('d'),
    tags: ['縱連', '微縱連', '跳音', '單手'],
    youtube: 'https://youtu.be/04tDnxOwSFE',
    dxscore: 2205
  },
  {
    id: 'domybestmaster',
    title: 'どぅーまいべすと！',
    difficulty: 'Master',
    level: 12,
    chart: getChartType('d'),
    tags: ['微縱連', '單手', 'Each'],
    youtube: 'https://youtu.be/HbiLWNah3B8',
    dxscore: 2013
  }
]

function getChartType(chartType) {
  if (chartType === 's') {
    return 'スタンダード'
  } else if (chartType === 'd') {
    return 'でらっくす'
  } else {
    return 'Unknown'
  }
}

/*
    {
        id: () => {
          return this.title + this.difficulty
        },
        title: '',
        difficulty: '',
        level: 10,
        chart: getChartType('s'),
        tags : [],
        youtube: ''
    },
}*/
