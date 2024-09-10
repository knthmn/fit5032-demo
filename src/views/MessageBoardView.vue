<script setup>
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { ref } from "vue";
import { useCollection, useCurrentUser, useFirestore } from "vuefire";
import Post from "../components/Post.vue";

const firestore = useFirestore()

const posts = useCollection(
  query(collection(firestore, "posts"), orderBy("createdAt", "desc"), limit(20))
);

const newMessageFormData = ref({
  title: "",
  content: "",
});

const user = useCurrentUser();

const addMessage = async () => {
  const payload = {
    ...newMessageFormData.value,
    createdAt: serverTimestamp(),
    userId: user.value.uid,
  }
  console.log(payload);
  await addDoc(collection(firestore, "posts"), payload);
  newMessageFormData.value.title = "";
  newMessageFormData.value.content = "";
};
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-4">Message Board</h1>
    <div class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">Add a New Message</h2>
        <form @submit.prevent="addMessage">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              id="title"
              v-model="newMessageFormData.title"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea
              id="content"
              v-model="newMessageFormData.content"
              class="form-control"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Add Message</button>
        </form>
      </div>
    </div>
    <div>
      <h2 class="mb-4">Posts</h2>
      <div v-for="post in posts" :key="post.id" class="card mb-3">
        <Post :post="post" :post-id="post.id" />
        <!-- {{ post }} -->
      </div>
      <div v-if="!posts.length" class="card mb-3 p-4">
        <p :style="{ fontSize: '0.8rem' }">
          No posts yet <br />
          Add a new message to get started.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
