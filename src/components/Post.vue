<script setup>
import { collection, doc, setDoc } from 'firebase/firestore'
import { defineProps } from 'vue'
import { useCurrentUser, useDocument, useFirestore } from 'vuefire'
import Comments from './Comments.vue'

const firestore = useFirestore()

const props = defineProps({
  post: Object,
  postId: String
})
const user = useCurrentUser()

const userLikeDocumentRef = doc(
  collection(firestore, `posts/${props.postId}/likes`),
  user.value.uid ?? 'no_user'
)
const userLikeDocument = useDocument(userLikeDocumentRef)

const changeLikeStatus = async (type) => {
  await setDoc(userLikeDocumentRef, {
    status: type === userLikeDocument.data.value.status ? null : type
  })
}
</script>

<template>
  <div class="card-body">
    <h3 class="card-title">{{ post.title }}</h3>
    <p class="card-text">{{ post.content }}</p>
    <p
      :style="{
        fontSize: '0.8rem'
      }"
    >
      Number of likes: {{ post.likes ?? 0 }}
      <span class="fw-bold text-decoration-underline ms-2" @click="changeLikeStatus('like')">
        {{ userLikeDocument?.status === 'like' ? 'Liked' : 'Like' }}
      </span>
      <span class="fw-bold text-decoration-underline ms-2" @click="changeLikeStatus('dislike')">
        {{ userLikeDocument?.status === 'dislike' ? 'Disliked' : 'Dislike' }}
      </span>
    </p>
    <p
      class="text-muted"
      :style="{
        fontSize: '0.8rem'
      }"
    >
      Date: {{ post.createdAt.toDate().toLocaleString() }}
    </p>
    <Comments :post-id="post.id" />
  </div>
</template>
