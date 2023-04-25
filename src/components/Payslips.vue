<script>

import Payslips from '../static/payslips.json';
import dayjs from 'dayjs';
import Icon from './Icon.vue';

export default {
  components: {
    Icon
  },
  data() {
    return {
      opened: [],
      showEur: true,
      dayjs,
      payslips: Payslips,
    }
  },

  computed: {
    payslips() {
      return this.payslips
    },

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
    toggle(e) {
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
    }
  }
}

</script>

<template>
  <div class="wrapper">
    <div class="table-filter">
      <ul>
        <li><button :class="{ active: showEur }" @click="toggle">EUR ({{paySlipsInEuro.length}})</button></li>
        <li><button :class="{ active: !showEur }" @click="toggle">USD ({{paySlipsInDollar.length}})</button></li>
      </ul>
    </div>
    
    <div class="wrapper-inner">
      <div class="evolution-button">
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
          <template v-for="(visiblePaySlips, index) in visiblePaySlips">
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

.tooltip {
  visibility: hidden;
  position: absolute;
  width: 175px;
  height: 28px;
  padding: 5px;
  line-height: 1;
  text-align: center;
  z-index: 1;
  opacity: 0;
  transition: opacity .6s;

  background: #001738 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 4px;
  color: white;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #001738;
}

.tooltip-left {
  bottom: auto;
  right: 128%;
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