import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { ok } from 'assert';
import { useCallback, useRef } from 'react';

export const useCustomModal = () => {
	const { onOpen, isOpen: open, onClose } = useDisclosure();

	const close = useCallback(() => {
		onClose();
		window.alert('キャンセルなので何もしない。');
	}, [onClose]);

	const moreOpen = useCallback(() => {
		onClose();
		window.alert('ここで登録処理を実行。');
	}, [onClose]);

	const cancelRef = useRef(null);

	const renderModal = () => {
		return (
			<AlertDialog
				isOpen={open}
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
							<Button colorScheme='red' onClick={close} ml={3}>
								Cancel
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		);
	};

	return {
		renderModal,
	};
};
