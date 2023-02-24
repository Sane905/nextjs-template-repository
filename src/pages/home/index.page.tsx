import { NextPage } from 'next';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	ButtonProps,
	Modal,
	Stack,
	Text,
	useDisclosure,
	useModal,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useConfirm } from '@/hooks/useConfirm';
import { resolve } from 'dns';
import { CustomModal } from '@/components/modal';
import { useCustomModal } from '@/hooks/useCustomModal';

type Props = {
	token: string;
};
const Page: NextPage = () => {
	const [count, setCount] = useState(0);
	// useEffect(() => {
	// 	setCount(count + 1);
	// }, [count]);

	console.log(count);
	const onPress = useCallback(() => {
		console.log('222');
		setCount(count + 1);
	}, []);

	const fetcher = async (url: string) => {
		const da = {
			grant_type: 'refresh_token',
			refresh_token:
				'APJWN8c1eMZCCzalzMwSB9Nvp1JTTlOfDLlRo2t6015FFhfHQceKaJpJRJFHPqSBqSXJv3oR9r3XmDWrCocicrCxI3UWokLoi9upOq22M1hjMWPVWuCHC7h9J3WPEhUY1unBZV46LYBjASmB6vzUgpQVpRTJaSDX8TXrZB0QD0Jsa4ijpIyJ0yzt1yyUAD1FowwXrMakNaZjNfOQ2Nifh9As4IzXRc1tTw',
		};
		const method = {
			method: 'POST',
			body: JSON.stringify(da),
		};
		const response = await fetch(url, method);
		return response.json();
	};

	const params = {
		key: 'AIzaSyBT2JcCn_ox1e9jXDs2Nvly-DAfUmfsUKM',
	};
	const queryParams = new URLSearchParams(params);
	const { data, error, isLoading } = useSWR(
		`https://securetoken.googleapis.com/v1/token?${queryParams}`,
		fetcher,
		{
			onError(err, key, config) {},
			onSuccess(data) {
				console.log(data);
			},
		},
	);

	const { myConfirm, renderConfirmDialog } = useConfirm();

	const alert = useCallback(() => {
		const alert = window.confirm('退会しますか？');
		console.log(alert);
		if (alert) {
			window.alert('ここで登録処理を実行。');
		} else {
			window.alert('キャンセルなので何もしない。');
		}
	}, []);

	const onSubmit = async () => {
		// 確認ダイアログを表示し、
		// ユーザーが「OK」か「キャンセル」を押すまで待機する。
		const bool = await myConfirm();
		console.log(bool);

		// ユーザーが「OK」か「キャンセル」を押すと、以下が実行される。
		if (bool) {
			window.alert('ここで登録処理を実行。');
		} else {
			window.alert('キャンセルなので何もしない。');
		}
		console.log('aaa');
	};

	const { renderModal } = useCustomModal();

	const { onOpen, isOpen: open, onClose } = useDisclosure();

	const close = useCallback(() => {
		onClose();
		window.alert('キャンセルなので何もしない。');
	}, []);

	const moreOpen = useCallback(() => {
		onClose();
		window.alert('ここで登録処理を実行。');
	}, []);

	return (
		<Stack>
			<Text>aaaaa</Text>
			<Text
				bgGradient="linear(to-l, #7928CA, #FF0080)"
				bgClip="text"
				fontSize="6xl"
				fontWeight="extrabold"
			>
				aa
			</Text>
			{isLoading && <Text>isLoading...</Text>}
			{error && <Text>failed fetch</Text>}
			<Text>{data?.access_token}</Text>
			<Text>{count}</Text>
			<Button onClick={alert}>button</Button>
			<Button onClick={onSubmit}>button</Button>
			<Button onClick={onOpen}>button</Button>
			{renderConfirmDialog()}
			{renderModal()}
			<CustomModal isOpen={open} ok={moreOpen} cancel={close} />
		</Stack>
	);
};

// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	const params = {
// 		key: 'AIzaSyBT2JcCn_ox1e9jXDs2Nvly-DAfUmfsUKM',
// 	};
// 	const queryParams = new URLSearchParams(params);

// 	const da = {
// 		grant_type: 'refresh_token',
// 		refresh_token:
// 			'APJWN8c1eMZCCzalzMwSB9Nvp1JTTlOfDLlRo2t6015FFhfHQceKaJpJRJFHPqSBqSXJv3oR9r3XmDWrCocicrCxI3UWokLoi9upOq22M1hjMWPVWuCHC7h9J3WPEhUY1unBZV46LYBjASmB6vzUgpQVpRTJaSDX8TXrZB0QD0Jsa4ijpIyJ0yzt1yyUAD1FowwXrMakNaZjNfOQ2Nifh9As4IzXRc1tTw',
// 	};
// 	const method = {
// 		method: 'POST',
// 		body: JSON.stringify(da),
// 	};

// 	const res = await fetch(
// 		`https://securetoken.googleapis.com/v1/token?${queryParams}`,
// 		method,
// 	);
// 	const data = await res.json();
// 	const token = data.access_token as string;
// 	// Pass data to the page via props
// 	return { props: { token } };
// }

export default Page;
