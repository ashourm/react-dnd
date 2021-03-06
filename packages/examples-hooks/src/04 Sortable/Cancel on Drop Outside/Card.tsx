import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
const {
	useDrag,
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

export interface CardProps {
	id: string
	text: string
	moveCard: (id: string, to: number) => void
	findCard: (id: string) => { index: number }
}

const Card: React.FC<CardProps> = ({ id, text, moveCard, findCard }) => {
	const ref = React.useRef(null)

	const { isDragging } = useDrag({
		ref,
		type: ItemTypes.CARD,
		begin: () => ({ id, originalIndex: findCard(id).index }),
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	useDrop({
		ref,
		type: ItemTypes.CARD,
		canDrop: () => false,
		hover(monitor) {
			const { id: draggedId } = monitor.getItem()
			if (draggedId !== id) {
				const { index: overIndex } = findCard(id)
				moveCard(draggedId, overIndex)
			}
		},
	})

	const opacity = isDragging ? 0 : 1
	return (
		<div ref={ref} style={{ ...style, opacity }}>
			{text}
		</div>
	)
}

export default Card
