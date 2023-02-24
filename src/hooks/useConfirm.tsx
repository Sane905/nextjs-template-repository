import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

// このカスタムフックで管理する状態を表す型
type State = {
	// ダイアログの開閉状態
	isOpen: boolean;
	resolve: (bool: boolean) => void;
};

// 状態の初期値
const initialState: State = {
	// ダイアログは閉じている
	isOpen: false,
	resolve: () => {},
};

export const useConfirm = () => {
	const [state, setState] = useState<State>(initialState);

	// 確認ダイアログを起動するための関数
	const myConfirm = () => {
		const promise: Promise<boolean> = new Promise((resolve) => {
			const newState: State = {
				isOpen: true, // ダイアログを開いた状態に。
				resolve, // resolve関数をステートに保存。
			};

			// 状態を更新。
			setState(newState);
		});

		return promise;
	};

	// 「OK」ボタン用の関数
	const ok = () => {
		// resolveしてあげる
		state.resolve(true);
		// 状態は初期化。
		setState(initialState);
	};

	// 「キャンセル」ボタン用の関数
	const cancel = () => {
		// resolveしてあげる
		state.resolve(false);
		// 状態は初期化。
		setState(initialState);
	};

	const cancelRef = useRef(null);

	const renderConfirmDialog = () => {
		return (
			<AlertDialog
				isOpen={state.isOpen}
				onClose={() => {}}
				leastDestructiveRef={cancelRef}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Customer
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={ok}>OK</Button>
							<Button colorScheme='red' onClick={cancel} ml={3}>
								Cancel
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		);
	};

	return {
		myConfirm, // 確認ダイアログを起動するための関数
		isOpen: state.isOpen, // ダイアログの開閉状態
		ok, // 「OK」ボタン用の関数
		cancel, // 「キャンセル」ボタン用の関数
		renderConfirmDialog,
	};
};
