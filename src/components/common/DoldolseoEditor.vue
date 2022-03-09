<template>
  <div class="editor--container">
    <div v-if="editor"
         class="editor--menubar">

      <div class="editor--button_group">
        <div class="editor--fontbox">
          <button @click="isClicked_font = !isClicked_font">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0.8 0.9 14 14">
              <path
                  d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="1 4 14 14"
                 style="width: 6px; height: 6px;">
              <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <div class="editor--fontlistbox">
            <ul class="editor--fontlist" v-if="isClicked_font">
              <li v-for="font in fontList"
                  @click="editor.chain().focus().setFontFamily(font).run(); isClicked_font = !isClicked_font"
                  :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: font }) }"
                  :style="{fontFamily: font}">
                {{ font }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span class="editor--line_vertical"/>

      <div class="editor--button_group">
        <button @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0.5 0.9 14 14"
               preserveAspectRatio="xMinYMin slice"
          >
            <path
                d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="1.1 1 14 14">
            <path
                d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="1 0.9 14 14">
            <path
                d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0.1 0.4 16 16">
            <path
                d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
            />
          </svg>
        </button>
      </div>
      <span class="editor--line_vertical"/>

      <div class="editor--button_group">
        <div class="editor--colorbox">
          <button @click="isClicked_color = !isClicked_color">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="-1.5 -1.5 19 19">
              <path
                  d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="1 4 14 14"
                 style="width: 6px; height: 6px;">
              <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
          <div class="editor--colorlistbox">
            <ul class="editor--colorlist"
                v-if="isClicked_color">
              <li v-for="color in colorList"
                  @click="editor.commands.setColor(color); isClicked_color = !isClicked_color"
                  :style="{backgroundColor: color}">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span class="editor--line_vertical"/>

      <div class="editor--button_group">
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="-0.2 0 16 16">
            <path
                d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16">
            <path
                d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16">
            <path
                d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"
            />
          </svg>
        </button>
      </div>
      <span class="editor--line_vertical"/>
      <div class="editor--button_group">
        <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0.5 0 15 15">
            <path
                fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0.5 0 15 15">
            <path
                fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
            />
            <path
                d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="-0.1 0 16 16">
            <path
                d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z"
            />
          </svg>
        </button>
      </div>
      <span class="editor--line_vertical"/>

      <div class="editor--button_group">
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16">
            <path
                d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16">
            <path
                d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
            />
          </svg>
        </button>
        <button>
          <label for="editor--img">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 16 16">
              <path
                  d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
              <path
                  d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
              />
            </svg>
          </label>
        </button>
        <input id="editor--img"
               type="file"
               class="editor--img_input"
               @change="setImage"
        />
      </div>
      <span class="editor--line_vertical"/>

      <div class="editor--button_group">
        <button @click="editor.chain().focus().undo().run()">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 -0.6 16 16">
            <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path
                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
            />
          </svg>
        </button>
        <button @click="editor.chain().focus().redo().run()">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0.2 -0.6 16 16">
            <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="editor--editarea">
      <editor-content
          :editor="editor"
          class="editor"
      />
    </div>
  </div>
</template>

<script>
import {useEditor, EditorContent} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import {Color} from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import {ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";
import onError from "../../module/onError";

const content = ref('')
export default {
  components: {
    EditorContent,
  },
  name: "DoldolseoTextEditor",
  props: {
    imageUrl: {
      type: String,
      require: true,
    },
    contentBeforeUpdating: {
      type: String,
      require: false,
      default: '',
    },
  },
  setup(props) {
    const editor = useEditor({
      content: props.contentBeforeUpdating,
      extensions: [
        StarterKit,
        TextStyle,
        Color,
        FontFamily,
        Image.configure({
          inline: true,
        }),
        Placeholder.configure({
          placeholder: '최대 2048자까지 쓸 수 있습니다.',
        }),
        CharacterCount.configure({
          limit: 2048,
        }),
      ],
      onUpdate: ({editor}) => {
        content.value = editor.getHTML()
      },
    })

    const isClicked_font = ref(false)
    const isClicked_color = ref(false)
    const fontList = [
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'cursive',
      'Helvetica Neue',
      'Impact',
      'Inter',
      'Lucida Grande',
      'monospace',
      'Tahoma',
      'Times New Roman',
      'serif',
      'Verdana'
    ]

    const colorList = [
      'transparent', '#999999', '#FAE0D4', '#FAECC5', '#E4F7BA', '#CEFBC9', '#D4F4FA', '#D9E5FF', '#DAD9FF', '#E8D9FF', '#FFD9FA', '#FFD9EC',
      '#ffffff', '#777777', '#FFC19E', '#FFE08C', '#CEF279', '#B7F0B1', '#B2EBF4', '#B2CCFF', '#B5B2FF', '#D1B2FF', '#FFB2F5', '#FFB2D9',
      '#f7f7f7', '#555555', '#F29661', '#F2CB61', '#BCE55C', '#86E57F', '#5CD1E5', '#6799FF', '#6B66FF', '#A566FF', '#F361DC', '#F361A6',
      '#e2e2e2', '#4C4C4C', '#CC723D', '#CCA63D', '#9FC93C', '#47C83E', '#3DB7CC', '#4374D9', '#4641D9', '#8041D9', '#D941C5', '#D9418C',
      '#9c9c9c', '#333333', '#FF5E00', '#FFBB00', '#ABF200', '#1DDB16', '#00D8FF', '#0054FF', '#0100FF', '#5F00FF', '#FF00DD', '#FF007F',
      '#c2c2c2', '#141414', '#993800', '#997000', '#6B9900', '#2F9D27', '#008299', '#003399', '#050099', '#3F0099', '#990085', '#99004C',
      '#353535', '#000000', '#662500', '#664B00', '#476600', '#22741C', '#005766', '#002266', '#030066', '#2A0066', '#660058', '#660033',
    ]

    const imageURL = props.imageUrl
    const {cookies} = useCookies()
    const router = useRouter()

    const setImage = (e) => {
      const file = e.target.files[0]

      if(!checkExt(file)) return;
      if (!checkFileSize(file)) return

      const formData = new FormData()
      formData.append('imgFile', file)

      axios.post(imageURL, formData, {
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        }
      }).then((resp) => {
        console.log(imageURL + " 이미지 가져오기 성공 status : " + resp.status)
        console.log(imageURL + '/' + resp.data)
        editor.value.chain().focus().setImage({src: imageURL + '/' + resp.data}).run()
      }).catch((err) => {
        console.log(imageURL + " 이미지 가져오기 실패 "+err.response.status)
        onError.httpErrorException(err)
      })
    }

    const checkFileSize = (file) => {
      if (file.size > 500000) {
        alert("이미지 사이즈는 500Kb 이내로 첨부 가능합니다. ")
        return false
      }
      return true
    }

    const checkExt = (file) => {
      const fileName = file.name
      const extList = ['jpg','jpeg','png','gif']
      const extIdx = fileName.lastIndexOf(".")
      const ext = fileName.substring(extIdx+1,fileName.length).toLowerCase()

      if(extList.indexOf(ext) === -1){
        alert("이미지 파일만 첨부 가능합니다.")
        return false
      }
      return true
    }

    return {
      editor,
      isClicked_font,
      isClicked_color,
      fontList,
      colorList,
      setImage,
    }
  },
  content: content,
}
</script>

<style scoped>
.editor--container {
  width: 1050px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.editor--menubar {
  background-color: #fbfbfb;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, .06);
  text-align: left;
  box-shadow: 0 3px 5px -4px gray;
  width: 100%;
  /*border-bottom: 1px solid rgba(0,0,0,.2);*/
}

.editor--menubar button {
  width: 50px;
  height: 35px;
  background-color: transparent;
  border: none;
  display: inline-block;
  /*border: 1px solid;*/
}

.editor--menubar svg {
  width: 20px;
  height: 20px;
  fill: black;
  margin-top: 3px;
  /*border: 1px solid;*/
}

.editor--menubar svg:hover {
  fill: #2cacd1;
}

.editor--button_group {
  display: inline-block;
  margin-right: 6px;
  margin-left: 6px;
  /*border-left: 1px solid;*/
  /*border: 1px solid;*/
  margin-top: 3px;
}

.editor--line_vertical {
  display: inline-block;
  border-left: 1px solid rgba(0, 0, 0, .2);;
  width: 1px;
  height: 22px;
  /*margin-top: 10px;*/
}

.editor--editarea {
  padding-right: 20px;
  padding-left: 20px;
  min-height: 450px;
  max-height: 1000px;
  overflow: auto;
  width: 96.2%;
  border: 1px solid rgba(0, 0, 0, .06);
}

.editor--fontbox {
  display: inline-block;
  position: relative;
  border: none;
}

.editor--fontlistbox {
  display: block;
  border: none;
  margin: 0;
  padding: 0;
}

.editor--fontlist {
  padding: 10px;
  width: 140px;
  line-height: 25px;
  background-color: white;
  z-index: 1;
  position: absolute;
  top: 20px;
  left: 0;
  list-style: none;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 1px 3px 3px #fbfbfb;
  font-size: 18px;

}

.editor--fontlist li:hover {
  color: #4b8de9;
}

.editor--colorbox {
  display: inline-block;
  position: relative;
  border: none;
}

.editor--colorlistbox {
  display: block;
  border: none;
  margin: 0;
  padding: 0;
}

.editor--colorlist {
  padding: 10px;
  width: 250px;
  background-color: white;
  z-index: 1;
  position: absolute;
  top: 20px;
  left: 0;
  list-style: none;
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 6px;
  box-shadow: 0 1px 3px 3px #fbfbfb;
  line-height: 0;
}

.editor--colorlist li {
  display: inline-block;
  width: 18px;
  height: 18px;
  /*border-right: 1px solid white;*/
  /*border-bottom: 1px solid white;*/
  border: 1px solid white;
}

.editor--colorlist li:hover {
  border: 1px solid #4b8de9;
}

.editor--img_input {
  width: 0;
  height: 0;
  overflow: hidden;
  border: 0;
  padding: 0;
}

</style>