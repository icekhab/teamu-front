<template>
  <div
    class="image-uploader"
    :class="{'image-uploader__error': !!isFileMaxSizeError }"
  >
    <label :for="name">
      <Avatar
        class="image-uploader__avatar"
        :username="username"
        :src="src || baseSrc"
        :custom-style="{ 'background-size': 'cover', width: '100%', height: '100%' }"
      />

      <div class="overlay">
        <AttachmentIcon style="width: 14px; height: 24px; color: #FFFFFF;" />
      </div>
    </label>
    <input
      :id="name"
      ref="inputFile"
      :name="name"
      type="file"
      accept="image/*"
      style="display:none;"
      @change="displayFile"
    >
    <div
      class="image-uploader__max-size"
      :class="{'image-uploader__max-size__error': !!isFileMaxSizeError }"
    >
      jpg / png не более 1 mb
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';
import AttachmentIcon from '@/static/images/svg/attachment-icon.svg';

export default {
  name: 'AvatarChooser',
  components: {
    Avatar,
    AttachmentIcon,
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    baseSrc: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '350px',
    },
    error: {
      default: null,
      validator(value) {
        return (
          value === null || Array.isArray(value) || typeof value === 'string'
        );
      },
    },
    progress: {
      type: Number,
      default: null,
    },
    username: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      src: null,
      isFileMaxSizeError: false,
    };
  },
  computed: {
    normalizedErrors() {
      if (typeof this.error === 'string') return [this.error];
      if (Array.isArray(this.error)) return [...this.error];

      return [];
    },
    uploading() {
      return this.progress !== null && this.progress !== 100;
    },
    style() {
      const containerStyle = {};
      if (this.src || this.baseSrc) {
        containerStyle.backgroundImage = `url(${this.src || this.baseSrc})`;
        containerStyle.backgroundSize = 'cover';
      }

      return containerStyle;
    },
  },
  methods: {
    displayFile(event) {
      if (event.target.files && event.target.files[0]) {
        if (event.target.files[0].size > 1000000) {
          this.isFileMaxSizeError = true;

          return;
        }

        this.isFileMaxSizeError = false;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.src = e.target.result;
          const $event = {
            // data: e.target.result.replace(/^data:image\/[a-z]+;base64,/, ''),
            file: event.target.files[0],
            field: this.name,
          };
          this.$emit('change', $event);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    },
  },
};
</script>

<style scoped lang="postcss">
.image-uploader {
  cursor: pointer;
  display: flex;
  border-radius: 50%;
  flex-direction: column;
  justify-content: center;
  position: relative;
  //overflow: hidden;
  min-width: 50px;
  min-height: 50px;
  margin: 0;
  transition: all .1s ease-in;
  position: relative;

  &__avatar {
    background-size: cover!important;
  }

  &__error {
    border: 2px solid var(--errorColor);
  }

  &__logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__download-btn {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__download-icon {
    margin-right: 10px;
  }
  &__max-size {
    position: absolute;
    top: 104%;
    color: black;
    text-align: center;
    display: none;
    //color: var(--greyColor);
    margin-bottom: 20px;
    font-size: 10px;
    line-height: 12px;
    &__error {
      color: var(--errorColor);
      display: block;
    }
  }
  label {
    cursor: pointer;
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;
  }
  svg,
  p {
    display: block;
    color: #aaa;
    margin: 0 auto;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  svg + p {
    line-height: 8rem;
    text-align: center;
  }
  .progress-overlay {
    height: 100%;
    transition: all 0.3s;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: #aaa;
    bottom: 0;
    text-align: center;
    position: absolute;
  }
  .overlay {
    transition: all 0.3s;
    opacity: 0;
    width: 100%;
    background: rgba(#333333, 0.8);
    color: white;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    border-radius: 50%;
  }
  &:hover {
    //box-shadow: var(--defaultBoxShadow);
    .overlay {
      opacity: 1;
    }
  }
  ul.errors {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: red;
    li {
      color: white;
    }
  }
}
@media (min-width: 1200px) {
  .image-uploader {

    &__download-btn {
      width: 80%;
      margin: 0 auto 10px;
    }
  }
}
</style>
