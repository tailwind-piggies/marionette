<template>
  <yam-page-layout name="Topic List">
    <yam-section>

      <yam-data-table
        :data="topics"
        :columns="columns"
        :pagination="pagination"
        @row-action="handleRowAction"
      >
      </yam-data-table>

      <edit-modal
        v-model="data"
        :showModal="showModal"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      ></edit-modal>

    </yam-section>
  </yam-page-layout>
</template>

<script>
  import moment from 'moment'

  /* services */
  import topicServices from '../../services/topic'

  /* yam components */
  import {
    YamPageLayout,
    YamSection,
    YamDataTable
  } from '@xhs/yam-layout'

  import EditModal from '../../components/Topic/EditModal'

  export default {
    name: 'List',

    components: {
      YamDataTable,
      YamSection,
      YamPageLayout,
      EditModal
    },
    data() {
      return {
        data: null,
        showModal: false,
        columns: [{
          title: 'Title',
          key: 'title',
        }, {
          title: 'Create time',
          key: 'createTime'
        }, {
          title: 'Actions',
          is: 'buttons',
          props: {
            buttons: [{
              text: 'Edit',
              type: 'outline',
              icon: 'trash',
              action: 'edit',
              modifier: 'primary'
            }]
          }
        }, {
          title: 'Online/Offline',
          is: 'buttons',
          props: {
            buttons: [{
              text: 'Online',
              type: 'outline',
              icon: 'pencil',
              action: 'online',
              modifier: 'primary'
            }]
          }
        }, {
          title: 'Drop',
          is: 'buttons',
          props: {
            buttons: [{
              text: 'Delete',
              type: 'outline',
              icon: 'trash',
              action: 'delete',
              modifier: 'danger',
            }]
          }
        }],
        pagination: {
          total: 100,
          pageNo: 1,
          showPerPageOptions: false
        },
        topics: [],
      }
    },

    computed: {

    },

    methods: {
      getTopics() {
        topicServices.getTopics().then(data => {
          this.topics = data.topics.map(item => {
            return {
              id: item._id,
              title: item.title,
              content: item.content,
              createTime: moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')
            }
          })
        })
      },
      handleCancel() {
        this.showModal = false
      },
      handleConfirm(value) {
        topicServices.postTopics({
          title: value.title,
          content: value
        }).then(() => {
          this.showModal = false
          this.$toast('Action success.')
          this.getTopics()
        })
      },
      handleRowAction(type, row) {
        if (type === 'edit') {
          this.showModal = true
          this.data = Object.assign({}, row.content, {
            title: row.title
          })
        }
      }
    },

    created() {
      this.getTopics()
    }
  }

</script>
