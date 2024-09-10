<script setup>
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { defineProps, ref } from "vue";
import { useCollection, useCurrentUser } from "vuefire";

const props = defineProps({
  postId: String,
});

const db = getFirestore();

const comments = useCollection(
  collection(db, `posts/${props.postId}/comments`)
);

const user = useCurrentUser();

const newCommentFormData = ref({
  content: "",
});

const addComment = async () => {
  await addDoc(collection(db, `posts/${props.postId}/comments`), {
    ...newCommentFormData.value,
    createdAt: serverTimestamp(),
    userId: user.value.uid,
  });
  newCommentFormData.value.content = "";
};
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <h4 class="card-title fs-6 fw-bold">Comments</h4>
      <div v-for="comment in comments" :key="comment.id" class="mb-3">
        <p class="card-text">{{ comment.content }}</p>
        <p class="text-muted" :style="{ fontSize: '0.8rem' }">
          Date: {{ comment.createdAt.toDate().toLocaleString() }}
        </p>
      </div>
      <div
        v-if="!comments.length"
        class="mb-3 p-2"
        :style="{ fontSize: '0.8rem' }"
      >
        No comments
      </div>
      <div>
        <form @submit.prevent="addComment">
          <div class="mb-3">
            <label for="content" class="form-label">New Comment</label>
            <textarea
              id="content"
              v-model="newCommentFormData.content"
              class="form-control"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-outline btn-sm">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
