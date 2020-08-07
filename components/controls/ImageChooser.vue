<template>
  <div>
    <label :for="name">
      <TButton
        type="button"
        theme="outline-primary"
        class="image-uploader__download-btn"
        @click="$refs.inputFile.click()"
      >
        <DownloadIcon class="image-uploader__download-icon" />
        Картинка проекта
      </TButton>
    </label>

    <div
      class="image-uploader__max-size"
      :class="{'image-uploader__max-size__error': !!isFileMaxSizeError }"
    >
      jpg / png не более 1 mb
    </div>

    <div
      :style="style"
      class="image-uploader"
      :class="{'image-uploader__error': !!isFileMaxSizeError }"
    >
      <label :for="name">
        <img
          v-if="!src && !baseSrc"
          class="image-uploader__logo"
          src="/images/svg/no-photo.svg"
          alt="project logo"
        >
        <div v-if="uploading" class="progress-overlay">
          <span>{{ progress }} %</span>
        </div>
        <div v-else-if="src" class="overlay">Change Photo</div>
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
    </div>
  </div>
</template>

<script>
import DownloadIcon from '@/static/images/svg/download-icon.svg';
import TButton from '@/components/controls/TButton.vue';

export default {
  name: 'ImageChooser',
  components: {
    TButton,
    DownloadIcon,
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
  border: 1px solid var(--borderColor);
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  background: white;
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 200px;
  margin: auto;
  transition: all .1s ease-in;

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
    text-align: center;
    color: var(--greyColor);
    margin-bottom: 20px;
    font-size: 10px;
    line-height: 12px;
    &__error {
      color: var(--errorColor);
    }
  }
  label {
    cursor: pointer;
    height: 100%;
    box-sizing: border-box;
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
    opacity: 0;
    transition: all 0.3s;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
  }
  &:hover {
    box-shadow: var(--defaultBoxShadow);
    label {
      opacity: 0.8;
    }
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
    width: 307px;
    height: 280px;

    &__download-btn {
      width: 80%;
      margin: 0 auto 10px;
    }
  }
}
</style>
