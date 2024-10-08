import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [siteSettings, setSiteSettings] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': siteSettings.fontFamilyOption.value,
					'--font-size': siteSettings.fontSizeOption.value,
					'--font-color': siteSettings.fontColor.value,
					'--container-width': siteSettings.contentWidth.value,
					'--bg-color': siteSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setSiteSettings={setSiteSettings} />
			<Article />
		</main>
	);
};
