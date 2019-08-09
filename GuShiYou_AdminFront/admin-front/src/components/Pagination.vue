<template>
  <ul class="pagination">
    <li v-show="myTotalPage" class="paginate_button previous" v-bind:class="{'disabled': myFirstPage}" @click="prePage"><a><i class="fa fa-chevron-left"></i></a></li>

    <template v-if="myTotalPage <= 6" v-for="index in myTotalPage">
      <li class="paginate_button" v-bind:class="{'active': myPageNumber == index}">
        <a v-on:click="clickPage(index)">{{index}}</a>
      </li>
    </template>
    <template v-if="myTotalPage > 6" v-for="index in 6">
      <li class="paginate_button" v-bind:class="{'active': myPageNumber == index - 1 + pagination}">
        <a v-on:click="clickPage(index - 1 + pagination)">{{index - 1 + pagination}}</a>
      </li>
    </template>
    <li v-show="myTotalPage" class="paginate_button next" v-bind:class="{'disabled': myLastPage}" @click="nextPage"><a><i class="fa fa-chevron-right"></i></a></li>
  </ul>
</template>

<script>
import bus from '../bus'
let vm
let prePageNumber = 1 // 翻页前的页码

export default {
  name: 'Pagination',
  props: ['pageNumber', 'firstPage', 'lastPage', 'totalPage'],
  created () {
    vm = this
  },
  data () {
    return {
      myPageNumber: this.pageNumber,
      myFirstPage: this.firstPage,
      myLastPage: this.lastPage,
      myTotalPage: this.totalPage
    }
  },
  watch: {
    pageNumber (val) {
      vm.myPageNumber = val
    },
    firstPage (val) {
      vm.myFirstPage = val
    },
    lastPage (val) {
      vm.myLastPage = val
    },
    totalPage (val) {
      vm.myTotalPage = val
    },
    myPageNumber (val) {
      bus.$emit('on-page-number-change', val)
    }
  },
  computed: {
    pagination: function () {
      let startPage // 分页栏起始页码
      if (vm.myPageNumber >= prePageNumber) {
        if (vm.myPageNumber + 6 > vm.myTotalPage) {
          if (vm.myPageNumber == vm.myTotalPage - 5) {
            startPage = vm.myTotalPage - 6
          } else {
            startPage = vm.myTotalPage - 5
          }
        } else {
          startPage = vm.myPageNumber - 1
          if (startPage == 0) {
            startPage = 1
          }
        }
      } else {
        if (vm.myPageNumber - 5 < 1) {
          startPage = 1
        } else {
          startPage = vm.myPageNumber - 4
        }
      }
      prePageNumber = vm.myPageNumber
      return startPage
    }
  },
  methods: {
    clickPage: function (pageNumber) {
      if (vm.myPageNumber != pageNumber) {
        vm.myPageNumber = pageNumber
        bus.$emit('on-page', vm.myPageNumber)
      }
    },
    prePage: function () {
      vm.myPageNumber --
      if (vm.myPageNumber < 1) {
        vm.myPageNumber = 1
      } else {
        bus.$emit('on-page', vm.myPageNumber)
      }
    },
    nextPage: function () {
      vm.myPageNumber ++
      if (vm.myPageNumber > vm.myTotalPage) {
        vm.myPageNumber = vm.myTotalPage
      } else {
        bus.$emit('on-page', vm.myPageNumber)
      }
    }
  }
}
</script>