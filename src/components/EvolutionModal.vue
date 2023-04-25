<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
  });
</script>
<template>
  <Transition>
      <div class="modal-overlay">
        <div class="modal-wrapper">
          <div class="modal">
            <div class="modal-header">
              {{ title }}
              <span class="close" @click="$emit('close')">✕</span>
            </div>
            <div class="modal-body"></div>
          </div>
        </div>
      </div>
  </Transition>
</template>

<style>
.modal-overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal {
  max-width: calc(100vw - 36px);
  height: calc(100vh - 35px);
  margin: 0 auto;

  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 6px 16px #0000001A;
  border-radius: 12px;
}

.modal-header {
  border-bottom: 1px solid #97A0AC;
  padding: 39px 72px;
  font-size: 24px;
  font-weight: bold;
}

.modal-header .close {
  float: right;
  width: 48px;
  height: 48px;
  background: #001738;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0px 3px 6px #00000029;
}

.modal-header .close:hover {
  cursor: pointer;
  background: #303D63;
}

.modal-body {
  padding: 39px 72px;
}
</style>