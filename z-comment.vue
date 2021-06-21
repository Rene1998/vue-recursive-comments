<template>
	<ul class="comment">
		<div class="head d-flex justify-content-start">
			<div>
				<img class="avatar" :src="comment.author.avatar ? comment.author.avatar.path : require('./img/no-avatar.png')">
			</div>
			<div class="ml-3">
				<h5>{{ comment.author.username }}</h5>
				<p style="font-size: 12px">{{ posted_at }}</p>
			</div>
		</div>
		<div class="body">
			<p v-if="!editMode">{{ comment.content }}</p>

			<div v-if="isLoggedIn">
				<div class="form-group" v-if="editMode">
					<textarea v-model="comment.content" class="form-control" rows="3"  autocomplete="none"></textarea>
				</div>

				<a class="mt-1 action" @click="editMode = true" 		v-if="isEditEnabled && !editMode && !showReplyField">Upraviť</a>
				<a class="mt-1 action" @click="edit()" 					v-if="editMode && !showReplyField">Uložiť zmeny</a>
				<a class="mt-1 action" @click="editMode = false" 		v-if="editMode && !showReplyField">Zrušiť</a>

				<a class="mt-1 action" @click="showReplyField = true" 	v-if="!showReplyField && !editMode && !isReply">Odpovedať</a>

				<a class="mt-1 action" @click="remove()" 				v-if="isEditEnabled && !editMode && !showReplyField">Vymazať</a>

				<form v-if="showReplyField">
					<div class="form-group">
						<textarea v-model="addReplyText" class="form-control" placeholder="Váš komentár..." rows="4" autocomplete="none"></textarea>
						<b-button variant="outline-primary" @click="addReply()" :disabled="$wToast.isLoading()">Pridať</b-button>
						<a class="mt-1 action" @click="showReplyField = false" v-if="showReplyField">Zrušiť</a>
					</div>
				</form>
			</div>
		</div>
	</ul>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import api from './api'

export default {
	props: {
		modelId: {
			type: Number,
			required: true
		},
		comment: {
			type: Object,
			required: true
		},
		isReply: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data() {
		return {
			addReplyText: '',
			showReplyField: false,
			editMode: false
		}
	},
	computed: {
		...mapGetters('wAuth', [
			'isLoggedIn',
			'user'
		]),
		posted_at() {
			return moment(this.comment.created_at).format('MMMM Do YYYY')
		},
		isEditEnabled() {
			if (this.isReply) {
				return this.comment.author_id == this.user.id || this.user.groups && this.user.groups.includes('admin')
			}

			return this.comment.author_id == this.user.id || this.user.groups && this.user.groups.includes('admin')
		},
	},
	methods: {
		async remove() {
			this.$wToast.clear()
			try {
				await api.deleteComment(this.comment.id)

				this.$wToast.success()
				this.$emit('refreshComments')
			} catch (e) {
				this.$wToast.error(e)
			}
		},
		async edit() {
			this.$wToast.clear()
			try {
				await api.editComment(this.comment.id, this.comment.content)
				this.editMode = false
				this.$wToast.success()
				this.$emit('refreshComments')
			} catch (e) {
				this.$wToast.error(e)
			}
		},
		async addReply() {
			this.$wToast.clear()
			try {
				await api.addReply(this.comment.id, this.addReplyText)
				this.addReplyText = ''
				this.showReplyField = false
				this.$wToast.success()
				this.$emit('refreshComments')
			} catch (e) {
				this.$wToast.error(e)
			}
		}
	}
}
</script>

 <style lang="scss" scoped>
	a.action {
		font-size: 14px;
		margin-right: 20px;

		&:hover {
			cursor: pointer;
		}
	}

	.comment {
		padding-left: 10px;
		margin-bottom: 30px;
		padding-bottom: 30px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		.head {
			margin-bottom: 20px;

			.avatar {
				height: 50px;
				widows: 50px;
			}
		}

		textarea {
			margin-bottom: 20px;
		}
	}
</style>