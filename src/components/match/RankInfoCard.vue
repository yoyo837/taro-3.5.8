<script lang="jsx">
import { defineComponent, toRefs } from 'vue';
// @tarojs/components 默认不经过 babel 编译
import { View } from '@tarojs/components';

export default defineComponent({
  name: 'RankInfoCard',
  components: {},
  props: {
    rankInfo: Object,
  },
  setup(props) {
    const { groupName, groupTeamTeamRankList } = toRefs(props.rankInfo);
    return () => (
      <View>
        <nut-row class="text-descr">
          <nut-col
            class="py-12px indent-xs text-default"
            span={12}
          >
            {groupName?.value}
          </nut-col>
          <nut-col
            class="py-12px"
            span={2}
          >
            胜
          </nut-col>
          <nut-col
            class="py-12px"
            span={2}
          >
            负
          </nut-col>
          <nut-col
            class="py-12px"
            span={2}
          >
            平
          </nut-col>
          <nut-col
            class="py-12px"
            span={3}
          >
            进/失
          </nut-col>
          <nut-col
            class="py-12px"
            span={3}
          >
            积分
          </nut-col>
        </nut-row>
        {groupTeamTeamRankList?.value?.map(item => (
          <>
            <nut-divider class="w-[96%] mx-auto my-0" />
            <nut-row class="text-default">
              <nut-col
                class="py-12px"
                span={12}
              >
                <nut-row>
                  <nut-col
                    span={6}
                    class="indent-xs text-descr"
                  >
                    {item.rank}
                  </nut-col>
                  <nut-col span={18}>{item.teamName}</nut-col>
                </nut-row>
              </nut-col>
              <nut-col
                class="py-12px"
                span={2}
              >
                {item.winsNum}
              </nut-col>
              <nut-col
                class="py-12px"
                span={2}
              >
                {item.lossesNum}
              </nut-col>
              <nut-col
                class="py-12px"
                span={2}
              >
                {item.drawsNum}
              </nut-col>
              <nut-col
                class="py-12px"
                span={3}
              >
                {item.winsNum}/{item.lossesNum}
              </nut-col>
              <nut-col
                class="py-12px"
                span={3}
              >
                {item.score}
              </nut-col>
            </nut-row>
          </>
        ))}
      </View>
    );
  },
});
</script>
