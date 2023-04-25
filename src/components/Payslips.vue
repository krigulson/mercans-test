<script>

import Payslips from '../static/payslips.json';
import dayjs from 'dayjs';
import Icon from './SvgIcon.vue';
import Modal from './EvolutionModal.vue';

export default {
  components: {
    Icon,
    Modal
  },
  data() {
    return {
      showModal: false,
      opened: [],
      showEur: true,
      dayjs,
      payslips: Payslips,
    }
  },

  computed: {
    

    paySlipsInEuro() {
      return this.payslips.filter(function (payslip) {
        return payslip.payslipEntries[4].currency === 'EUR';
      });
    },

    paySlipsInDollar() {
      return this.payslips.filter(function (payslip) {
        return payslip.payslipEntries[4].currency === 'USD';
      });
    },

    visiblePaySlips() {
      if (this.showEur) {
        return this.paySlipsInEuro
      } else {
        return this.paySlipsInDollar
      }
    }
  },

  methods: {
    filterByCurrency() {
      this.showEur = !this.showEur
    },

    showPdf(accessToken, visiblePaySlips) {
      const index = this.opened.indexOf(accessToken);
      if (index > -1) {
      	this.opened.splice(index, 1)
      } else {
      	this.opened.push(accessToken)
      }

      fetch(`http://localhost:5173/src/static/pdf/${accessToken}.pdf`)
        .then(response => {
          visiblePaySlips.pdfUrl = response.url
        })
    },

    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}

</script>

<template>
  <Modal v-if="showModal" title="Gross/Net Salary evolution" @close="toggleModal" />
  <div class="wrapper">
    <div class="table-filter">
      <ul>
        <li><button :class="{ active: showEur }" @click="filterByCurrency">EUR ({{paySlipsInEuro.length}})</button></li>
        <li><button :class="{ active: !showEur }" @click="filterByCurrency">USD ({{paySlipsInDollar.length}})</button></li>
      </ul>
    </div>
    
    <div class="wrapper-inner">
      <div class="evolution-button" @click="toggleModal">
        <div class="evolution-button-inner">
          <Icon name="graph" />
          <div class="tooltip tooltip-left">View salary information</div>
        </div>
      </div>
      <table>
        <thead>
          <th>#</th>
          <th>Month</th>
          <th>Payslips</th>
          <th>Gross salary</th>
          <th>Net pay</th>
          <th>Action</th>
        </thead>
        <tbody>
          <template v-for="(visiblePaySlips, index) in visiblePaySlips" :key="index">
            <tr @click="showPdf(visiblePaySlips.fileAttachment.accessToken, visiblePaySlips)" :class="{ opened: opened.includes(visiblePaySlips.fileAttachment.accessToken)}">
              <td>{{ index + 1 }}</td>
              <td class="month">{{ dayjs(visiblePaySlips.payrollDate).format('MMMM YYYY') }}</td>
              <td>{{ visiblePaySlips.fileAttachment.file.label }}</td>
              <td>{{ visiblePaySlips.payslipEntries[4].amount }} {{ visiblePaySlips.payslipEntries[4].currency }}</td>
              <td>{{ visiblePaySlips.payslipEntries[2].amount }} {{ visiblePaySlips.payslipEntries[2].currency }}</td>
              <td></td>
            </tr>
            <Transition name="fade" mode="out-in" appear>
              <tr v-if="opened.includes(visiblePaySlips.fileAttachment.accessToken)">
                <td colspan="6">
                  <embed :src="visiblePaySlips.pdfUrl + '#toolbar=0&navpanes=0'" :type="visiblePaySlips.fileAttachment.file.mimeType" width="100%" height="500px" />
                </td>
              </tr>
            </Transition>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.evolution-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: absolute;
  right: -25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.evolution-button-inner {
  width: inherit;
  height: inherit;
  background: white;
  border-radius: 50%;
  border: 2px solid #F4F6F8;

  display: flex;
  align-items: center;
  justify-content: center;
}

.evolution-button:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.evolution-button:hover .evolution-button-inner {
  background: #FEE5DB;
  cursor: pointer;
}

.evolution-button svg {
  width: 24px;
  height: 24px;
}

.wrapper {
  background: var(---ffffff) 0% 0% no-repeat padding-box;
  border: 1px solid var(---fee5db);
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #FEE5DB4D;
  border: 1px solid #FEE5DB;
  border-radius: 12px 30px 12px 12px;
  opacity: 1;
}

.wrapper-inner {
  padding-bottom: 80px;
  padding-left: 72px;
  padding-right: 72px;
}

.table-filter {
  height: 56px;
  background: var(--black) 0% 0% no-repeat padding-box;
  background: #001738 0% 0% no-repeat padding-box;
  border-radius: 8px 30px 30px 8px;
  opacity: 1;
  margin-bottom: 27px;
}

.table-filter ul {
  list-style: none;
  padding-inline-start: 24px;
  display: flex;
  height: 100%;
}

.table-filter ul li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-filter ul li button {
  padding: 16px 18px;
  color: #FFFFFF;
  font-weight: bold;
  height: 100%;
}

.table-filter ul li button.active {
  background: #E5541B;
}

td.month {
  color: #E5541B;
}

.opened {
  background-color: #FEE5DB;
}
</style>