import { v4 as uuid } from "uuid"

const boards = [
	{
		boardId: uuid(),
		boardName: "board1",
		lists: [
			{
				listId: uuid(),
				listName: "To Do",
				isArchived: false,
				cards: [
					{
						cardId: uuid(),
						cardName: "Do homework",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Read book",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Brush your teeth",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Do exercise",
						isArchived: false,
					},
				],
			},
			{
				listId: uuid(),
				listName: "Doing",
				isArchived: false,
				cards: [
					{
						cardId: uuid(),
						cardName: "Play game",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Feed the dog",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Finish working",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Song",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Get dressed",
						isArchived: false,
					},
				],
			},
			{
				listId: uuid(),
				listName: "Done",
				isArchived: false,
				cards: [
					{
						cardId: uuid(),
						cardName: "Go home",
						isArchived: false,
					},
					{
						cardId: uuid(),
						cardName: "Go to bed",
						isArchived: false,
					},
				],
			},
		],
	},
]

const initNewBoard = {
	boardId: uuid(),
	boardName: "",
	lists: [
		{
			listId: uuid(),
			listName: "To Do",
			isArchived: false,
			cards: [],
		},
		{
			listId: uuid(),
			listName: "Doing",
			isArchived: false,
			cards: [],
		},
		{
			listId: uuid(),
			listName: "Done",
			isArchived: false,
			cards: [],
		},
	],
}

export { boards, initNewBoard }
