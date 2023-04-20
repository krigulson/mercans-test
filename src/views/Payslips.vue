<script setup>

import humanize from '../helpers/humanize';

defineProps({
  title: {
    type: String,
    required: true
  }
})

</script>

<template>
  <h1 class="heading">{{ humanize(title) }}</h1>

  <div class="wrapper">
    <div class="table-filter">
      <ul>
        <li><a href="" class="active">EUR (12)</a></li>
        <li><a href="">USD (2)</a></li>
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
          <tr>
            <td>1</td>
            <td class="month">December 2021</td>
            <td>Payslip - HAA-002 - Myrle Guinane - 2019-03-01 - 2019-03-31.pdf</td>
            <td>2940.87 EUR</td>
            <td>2268 EUR</td>
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
}

.table-filter ul li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-filter ul li a {
  padding: 16px 18px;
  color: #FFFFFF;
  font-weight: bold;
}

.table-filter ul li a.active {
  background: #E5541B;
}

td.month {
  color: #E5541B;
}
</style>