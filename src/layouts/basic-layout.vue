<!--
 * @Author       : djkloop
 * @Date         : 2020-04-24 23:25:04
 * @LastEditors   : djkloop
 * @LastEditTime  : 2020-04-26 17:31:02
 * @Description  : 基础布局
 * @FilePath      : /form-create-ui/src/layouts/basic-layout.vue
 -->
<template>
  <el-container class="fc-container">
    <el-header class="fc-container-header">
      <div class="fc-container-header__logo">
        <img
          :width="cfgs.headerProps.logo.size"
          :height="cfgs.headerProps.logo.size"
          :src="cfgs.headerProps.logo.url"
          alt="logo"
        />
      </div>
      <div class="fc-container-header__title">{{ cfgs.headerProps.title }}</div>
    </el-header>
    <el-container class="fc-container-main">
      <div class="fc-container-main__box">
        <el-row type="flex">
          <!-- xs-24 sm-24 md-6 lg-6 xl-5 -->
          <el-col class="fc-container-main__components" :md="6" :lg="6" :xl="5" :sm="24" :xs="24">
            <el-aside style="width:auto;">
              <fc-components-list @fc-click-item="handleItemClick" />
            </el-aside>
          </el-col>
          <!-- xs-24 sm-24 md-18 lg-18 xl-19 -->
          <el-col :md="12" :lg="12" :xl="14" :xs="24" :sm="24">
            <el-container class="fc-container-main__section">
              <el-main>
                <fc-element-main ref="viewRefs" />
                <!-- <router-view ref="viewRefs" /> -->
              </el-main>
              <!-- <el-footer>Footer</el-footer> -->
            </el-container>
          </el-col>
          <!-- xs-24 sm-24 md-6 lg-6 xl-5 -->
          <el-col class="fc-container-main__components" :md="6" :lg="6" :xl="5" :sm="24" :xs="24">
            <el-aside style="width:auto;">
              <fc-components-props />
            </el-aside>
          </el-col>
        </el-row>
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/composition-api";
import configs from "@/configs/config";

/// components
import FcComponentsList from "@/components/fc-components-list/index.vue";
import FcComponentsProps from "@/components/fc-components-props/index.vue";
import FcElementMain from "@/views/ui/element/index.vue";
import { ComponentsItem } from "@/interface/components";
import { FCUIElementRefs } from "@/views/ui/element/fc-ui-element.interface";

export default defineComponent({
  name: "BaseLayout",
  components: {
    FcComponentsList,
    FcComponentsProps,
    FcElementMain,
  },
  setup() {
    const cfgs = reactive(configs);
    const viewRefs = ref<FCUIElementRefs>("");

    /// 左侧菜单点击添加到主区域
    const handleItemClick = (it: ComponentsItem) => {
      viewRefs.value.handleAddItem(void 0, it);
    };

    return {
      viewRefs,
      handleItemClick,
      cfgs,
    };
  },
});
</script>
<style lang="scss">
.fc-container-main__section {
  .el-main {
    padding: 10px;
  }
}
</style>

<style lang="scss" scoped>
@import "basic-layout.scss";
</style>
