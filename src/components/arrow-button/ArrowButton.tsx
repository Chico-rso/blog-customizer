import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

export type OnClick = {
	isMenuOpen: boolean;
	onClick: () => void;
};

export const ArrowButton = (props: OnClick) => {
	const { isMenuOpen, onClick } = props;

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: isMenuOpen,
			})}
			onClick={onClick}>
			<img
				src={arrow}
				alt='Иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow]: isMenuOpen,
				})}
			/>
		</div>
	);
};
