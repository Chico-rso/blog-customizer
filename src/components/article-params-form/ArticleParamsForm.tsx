import { FormEvent, useRef, useState, useCallback } from 'react';

// constants
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

// components
import { Select } from '../select/Select';
import { Text } from '../text/Text';
import { Separator } from '../separator/Separator';
import { RadioGroup } from '../radio-group/RadioGroup';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import clsx from 'clsx';

//hooks
import { useClickOutside } from '../arrow-button/hooks/useClickOutside';

// style
import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormSettings = {
	setSiteSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormSettings) => {
	const { setSiteSettings } = props;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [optionValue, setOptionValue] =
		useState<ArticleStateType>(defaultArticleState);
	const formElement = useRef<HTMLElement | null>(null);

	const handleToggleOpen = useCallback(() => {
		setIsMenuOpen((currentIsOpen) => !currentIsOpen);
	}, []);

	const updateFormField = useCallback(
		(fieldName: string, value: OptionType) => {
			setOptionValue((prevState) => ({
				...prevState,
				[fieldName]: value,
			}));
		},
		[]
	);

	const handleChange = useCallback(
		(fieldName: string) => (value: OptionType) => {
			updateFormField(fieldName, value);
		},
		[updateFormField]
	);

	const handleReset = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			setOptionValue(defaultArticleState);
			setSiteSettings(defaultArticleState);
		},
		[setSiteSettings]
	);

	const handleSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			setSiteSettings(optionValue);
		},
		[optionValue, setSiteSettings]
	);

	useClickOutside({
		isOpen: isMenuOpen,
		onClose: handleToggleOpen,
		rootRef: formElement,
	});

	return (
		<>
			<ArrowButton isMenuOpen={isMenuOpen} onClick={handleToggleOpen} />
			<aside
				ref={formElement}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={optionValue.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={optionValue.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={optionValue.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={optionValue.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={optionValue.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
