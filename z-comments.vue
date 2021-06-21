<template>
	<div class="comments-wrapper">
		<h4>Komentáre</h4>

		<p v-if="!comments || !comments.length" class="a-info-text mb-5">Tento projekt zaťiaľ nikto nekomentoval.</p>
		<div v-else-if="comments.length">
			<div v-for="comment in comments" :key="comment.id" >
				<z-comment :comment="comment" :modelId="modelId" @refreshComments="loadComments()" />

				<div v-for="reply in comment.replies" :key="reply.id" class="replies-wrapper">
					<z-comment :comment="reply" :isReply="true" :modelId="modelId" @refreshComments="loadComments()" />
				</div>
			</div>
		</div>

		<form>
			<h5>Pridať komentár</h5>
			<p v-if="!isLoggedIn" class="a-info-text">Pre pridanie komentára sa musíte <router-link to="/prihlasit-sa">prihlásiť</router-link></p>
			<div v-else class="form-group col-12">
				<textarea v-model="text" class="form-control" placeholder="Váš komentár..." rows="4"  autocomplete="none"></textarea>
				<b-button variant="outline-primary" @click="addComment()" :disabled="$wToast.isLoading()">Pridať</b-button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from './api'

export default {
	props: {
		modelId: {
			type: Number,
			required: true
		},
		model: {
			type: String,
			required: true
		}
	},
	components: {
		'z-comment': () => import('./z-comment.vue')
	},
	data() {
		return {
			text: '',
			comments: null
		}
	},
	computed: {
		...mapGetters('wAuth', [
			'isLoggedIn'
		])
	},
	async created() {
		await this.loadComments()
	},
	methods: {
		async addComment() {
			try {
				this.$wToast.clear_loading()
				await api.addComment(this. model, this.modelId, this.text)
				this.$wToast.success()
				this.text = ''
			} catch (e) {
				this.$wToast.error(e)
			}

			this.loadComments()
		},
		async loadComments() {
			try {
				const comments = await api.getByModelId(this.model, this.modelId)
				comments.reverse()
				comments.map(comment => comment.replies.reverse())

				this.comments = comments
			} catch (e) {
				this.comments = []
				this.comments.error = true
				this.$wToast.error(e)
			}
		}
	},
}
</script>

<style lang="scss" scoped>
	.comments-wrapper {
		padding: 30px 0;

		h4 {
			margin-bottom: 30px;
		}

		.replies-wrapper {
			padding-left: 30px;
		}

		.form-group {
			padding: 0;

			textarea {
				margin: 15px 0 20px 0;
			}
		}
	}
</style>
