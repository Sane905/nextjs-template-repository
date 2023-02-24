import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from '@chakra-ui/react';
import { ok } from 'assert';
import { memo, useRef } from 'react';

type Props = {
	isOpen: boolean;
	cancel: () => void;
	ok?: () => void;
};

export const CustomModal = memo<Props>(({ ok, isOpen, cancel }) => {
	const cancelRef = useRef(null);

	return (
		<AlertDialog
			isOpen={isOpen}
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
});
