<script>

import Payslips from '../static/payslips.json';
import dayjs from 'dayjs';

export default {
  data() {
    return {
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
          <tr v-for="(visiblePaySlips, index) in visiblePaySlips">
            <td>{{ index + 1 }}</td>
            <td class="month">{{ dayjs(visiblePaySlips.payrollDate).format('MMMM YYYY') }}</td>
            <td>{{ visiblePaySlips.fileAttachment.file.label }}</td>
            <td>{{ visiblePaySlips.payslipEntries[4].amount }} {{ visiblePaySlips.payslipEntries[4].currency }}</td>
            <td>{{ visiblePaySlips.payslipEntries[2].amount }} {{ visiblePaySlips.payslipEntries[2].currency }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
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
</style>