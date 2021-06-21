import wAxios from '@/plugins/w/axios'

export default {
	getByModelId: (model, mid) => wAxios.get_data(`comments/${model}/${mid}`),

	addComment: (model, mid, text) => wAxios.post_auth_data(`comments/${model}/${mid}`, {text}),
	deleteComment: (cid) => wAxios.delete_auth(`comments/${cid}`),
	editComment: (cid, text) => wAxios.patch_auth_data(`comments/${cid}`, {text}),
	addReply: (cid, text) => wAxios.post_auth_data(`comments/comment/${cid}`, {text}),
}