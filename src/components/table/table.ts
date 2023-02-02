// @ts-nocheck
// 表格的组件封装代码量略多， 使用mixin按块把功能抽离， 减少table.vue 代码量,  table中注重业务逻辑
import { defArr, getRandom, typeOf } from '@/utils/function';
import $lodash from 'lodash'

// 分页相关
export const PaginationMixin = {
    props: {
        pagination: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },

    data() {
        return {
            tablePagination: {
                pageNum: 1,
                pageSize: 20,
                total: 100,
                pageSizes: [20, 30, 50, 100, 200],
                layout: 'total, sizes, prev, pager, next, jumper'
            },
            paginationId: getRandom(15, 'pagination_id_')
        };
    },
    mounted() {
        console.log(this);
    },
    methods: {
        /**
         * 分页每页的数据条数变化
         */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.$emit('handleSizeChange', val);
        },
        /**
         * 分页页数变化
         */
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$emit('handleCurrentChange', val);
        },
        /**
         * 同步pagination配置参数
         */
        _changePagination(pagination, tablePagination) {
            // 循环配置项,如果传进来有数据,那么就替换掉,如果没有就保持原始数据
            for (const key in pagination) {
                if (Object.keys(tablePagination).includes(key)) {
                    // 仅针对对象采用递归修改， 数组格式直接覆盖
                    if (typeOf(tablePagination[key]) === 'object') {
                        this._changeConfig(pagination[key], tablePagination[key]);
                    } else {
                        tablePagination[key] = pagination[key];
                    }
                }
            }
        }
    },
    watch: {
        pagination: {
            handler() {
                this._changePagination(this.pagination, this.tablePagination);
            },
            immediate: true,
            deep: true
        }
    }
}

// 表格配置相关
export const TableConfigMixin = {
    props: {
        config: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },

    data() {
        return {
            tableConfig: {
                /* 表格相关--------------------------------------------------------------------------------start */
                tableRef: 'tableRef', // 表格的ref
                isShowPagination: true, // 是否显示分页
                checkboxColumn: {
                    isShowCheckbox: false, // 是否显示多选框
                    fixed: false,
                    label: '',
                    width: '50',
                    minWidth: '50',
                    align: 'center',
                    resizable: false,
                    headerAlign: 'center'
                },
                indexColumn: {
                    isShowIndex: true, // 是否显示序号列
                    fixed: false,
                    label: '序号',
                    width: '50',
                    minWidth: '50',
                    align: 'center',
                    resizable: false,
                    headerAlign: 'center'
                },
                expandColumn: {
                    isShowExpand: false, // 是否展示展开列
                    fixed: false,
                    label: '展开',
                    width: '50',
                    minWidth: '50',
                    align: 'center',
                    resizable: false,
                    headerAlign: 'center',
                    defaultExpandAll: false // 是否展开所有项
                },
                isShowHeader: true, // 是否显示表格header
                isShowTableBorderColumn: true, // 是否显示表格纵向边框
                tableHeight: 'auto', // 表格就设置为auto就可以
                key: 'id', // 每一行数据的唯一标识字段， 行数据的 Key，用来优化 Table 的渲染
                loadingText: '加载中......', // 表格loading的text文本
                tableLoading: false, // 是否显示表格loading
                hideOnSinglePage: false, // 分页是否在只有一页时隐藏
                tableSize: '', // 表格的size属性，控制表格的整体大小, 可取值： mini、small、medium
                highlightCurrentRow: false, // 是否开启表格点击高亮
                /* 表格相关--------------------------------------------------------------------------------end */

                /* 自定义参数--------------------------------------------------------------------------------start */
                tableWraperClassName: 'table-wraper-class-name', // table表格组件的父层className,通过父组件传值使用， 需要在外部通过class获取表格组件内部元素时如果一个页面存在多个表格， 那么需要通过class区分， 本组件内可以通过id获取元素
                tableType: 'common', // 取值 common | multiHeader, 或者别的 需要后续添加，默认使用多级表头
                children: 'children', // child 字段， 子列保存所在数据的字段名称， 是children、list或者是别的， 是什么这里就传什么, 在多级表头时tableType==='multiHeader'需要使用
                isTableFullArea: false // 表格是否撑满区域 ? 表格撑满除分页外的区域-flex:1 : 表格自适应，分页紧紧跟在表格下方，分页下方展示空白
                /* 自定义参数--------------------------------------------------------------------------------end */
            }
        };
    },
    methods: {
        /**
         * 同步config配置参数
         */
        _changeConfig(config, tableConfig) {
            // 循环配置项,如果传进来有数据,那么就替换掉,如果没有就保持原始数据
            for (const key in config) {
                if (Object.keys(tableConfig).includes(key)) {
                    // 仅针对对象采用递归修改， 数组格式直接覆盖
                    if (typeOf(tableConfig[key]) === 'object') {
                        this._changeConfig(config[key], tableConfig[key]);
                    } else {
                        tableConfig[key] = config[key];
                    }
                }
            }
        }
    },
    watch: {
        config: {
            handler() {
                this._changeConfig(this.config, this.tableConfig);
            },
            immediate: true,
            deep: true
        }
    }
}

// 表格row和column的赋值抽离
export const TableDataMixin = {
    props: {
        rowData: {
            type: Array,
            default: () => {
                return [
                    // {
                    //     name: 'uhjuh', // 展示所用字段
                    //     phone: 12, // 展示所用字段
                    //     address: 34, // 展示所用字段
                    //     shop: 56, // 展示所用字段
                    //     desc: 78, // 展示所用字段
                    //     date: '2021-09-09', // 展示所用字段

                    //     slot_name_name: 'slot_name', // 只单独定义某一个单元格， 自定义第一条数据的 name 的slot, 以slot_name 为前缀
                    //     slot_name_address: 'slot_address', // 只单独定义某一个单元格， 自定义第一条数据的 address 的slot 以slot_name 为前缀
                    //     class_column_phone: 'class_phone_val', // phone 字段列的默认展示时的自定义每一个单元格的class名称， 以class_column 为前缀
                    //     class_column_name: 'class_name_val', // name 字段列的默认展示时的自定义每一个单元格的class名称, 以class_column 为前缀

                    //     disabled: false, // 是否禁用多选框的选中
                    //     checked: false // 是否选中
                    // }
                ];
            }
        },
        columns: {
            type: Array,
            default: () => {
                return [
                    // {
                    //   type: "", // 当前列的类型   可取值有---[""] 默认使用slot模式
                    //   fixed: false, // 是否允许左右固定
                    //   prop: "index", // 字段
                    //   label: "序号",
                    //   width: "80",
                    //   minWidth: "60", // 最小宽度
                    //   slot_header: "", // 表格的自定义header内容的slot名称
                    //   slot_column: "slot", // 表格的自定义的内容区域单元的slot名称
                    //   resizable: false, // 表格列是否可以拖拽
                    //   align: "center", // 文案的对齐方式
                    //   isShowOverflowTooltip: false, // 是否显示tooltip提示
                    //   clickEventName: "clickEventNameClick", // 事件名称， 存在点击事件的单元格元素， 在点击触发点击事件时不会触发表格的rowClick事件， 没有点击事件的元素可以触发rowClick事件
                    //   htmlRender: (scope) => {
                    //       console.log(scope);
                    //       return `<div class="abc">使用v-html插入html模板进行html渲染</div>`
                    //   }, // 使用v-html进行插入渲染， 可插入html模板, 用于简单的渲染， 如字典取值映射, 简单的条件渲染等， 复杂逻辑还是使用slot形式
                    // },
                ];
            }
        }
    },

    data() {
        return {
            tableRowData: [], // copy 的表格行数据
            tableColumns: [] // copy 的表格header数据
        };
    },
    watch: {
        rowData: {
            handler() {
                this.rowData.map(x => {
                    x.customId = x.customId ? x.customId : getRandom(15, 'custom_row_id_')
                })
                this.tableRowData = this.rowData;
                this.$nextTick(() => {
                    this.doLayout();
                })
            },
            immediate: true,
            deep: true
        },
        columns: {
            handler() {
                this.tableColumns = this.columns;
                this.$nextTick(() => {
                    this.doLayout();
                })
            },
            immediate: true,
            deep: true
        }
    }
}

// checkbox 多选框相关
export const CheckboxMixin = {
    computed: {
        async getCheckedList() {
            // 使用watch监听checked 的变化， 用于回显
            return defArr(this.tableRowData).map(x => x.checked);
        }
    },
    data() {
        return {
            /**
             * 1. echoFlag 数据回显的flag，
             * 2. echoFlag 执行handleCheckboxChange方法时不需要触发 getCheckedList 的watch监听
             * 3. echoFlag 只有手动修改了数据项中的checked参数， 才会触发监听， 点击多选框会直接改变多选框状态，不需要触发watch监听修改
             */
            echoFlag: true,
            /**
             * 1. checkboxChangeFlag 数据回显的flag
             * 2. checkboxChangeFlag 数据回显 触发 getCheckedList watch 监听时不需要触发 handleCheckboxChange 方法
             */
            checkboxChangeFlag: true,
            checkedItemList: [] // 表格的checkbox的多选
        }
    },
    methods: {
        /**
         * 手动切换选中第几行数据
         */
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => this.$refs[this.tableConfig.tableRef].toggleRowSelection(row));
            } else {
                this.$refs[this.tableConfig.tableRef].clearSelection();
            }
        },
        /**
         * 多选框的change事件
         */
        handleCheckboxChange(val) {
            this.echoFlag = false;
            this.checkedItemList = val;
            this.$emit('emitCheckedList', this.checkedItemList);
            if (this.checkboxChangeFlag) {
                // 如果是 false 说明 getCheckedList 还没有执行完成
                // getCheckedList 的 watch 监听执行过程中不执行以下方法
                defArr(this.tableRowData).map(x => {
                    x.checked = val.some(m => m.customId === x.customId);
                });
            }
            this.$nextTick(() => {
                // 执行完watch后重置参数
                this.echoFlag = true;
            })
        },
        /**
         * 设置回显
         */
        async setCheckboxEcho() {
            console.log()
            if (!this.echoFlag) {
                // 如果是false说明执行了checkbox change事件， 不需要触发watch监听， 重置状态
                this.echoFlag = true;
                return;
            }
            this.checkboxChangeFlag = false;
            await this.$nextTick();
            defArr(this.tableRowData)
                .forEach(row => this.$refs[this.tableConfig.tableRef].toggleRowSelection(row, row.checked));
            this.checkboxChangeFlag = true;
        }

    },
    watch: {
        getCheckedList: {
            // 使用watch监听 checked 的变化， 用于回显多选框的选中
            async handler() {
                await this.setCheckboxEcho();
            },
            immediate: true,
            deep: true
        }
    }
}

// 表格公共部分相关--- 包含表格自带的事件方法定义、props传入的方法、
export const TableCommonMixin = {
    props: {
        expandRowKeys: {
            // 默认展开的keys合集， 使用slot_expand时有用
            type: Array,
            default: () => {
                return []
            }
        },
        spanMethod: {
            // 合并单元格方法
            type: Function,
            default: () => {
                return () => {
                    return [0, 0];
                };
            }
        },
        rowClassName: {
            // 动态添加 row-class-name 属性
            type: Function,
            default: () => {
                return () => {
                    return '';
                };
            }
        },
        cellClassName: {
            // 动态添加 cell-class-name 属性
            type: Function,
            default: () => {
                return () => {
                    return '';
                };
            }
        }

    },
    data() {
        return {
            tableWraperKey: getRandom(15, 'table_wraper_key_'),
            doLayoutDebounce: $lodash.debounce(this.doLayout, 250)
        }
    },
    mounted() {
        // 刷新表格
        window.addEventListener('resize', this.doLayoutDebounce);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.doLayoutDebounce);
    },
    methods: {
        /**
         * 单元格合并
         */
        tableSpanMethod({ row, column, rowIndex, columnIndex }) {
            // 从父组件传入单元格合并方法
            return this.spanMethod({ row, column, rowIndex, columnIndex });
        },
        /**
         * row行添加class类名
         */
        tableRowClassName({ row, column, rowIndex, columnIndex }) {
            // 从父组件传入单元格合并方法
            return this.rowClassName({ row, column, rowIndex, columnIndex });
        },
        /**
         * row行添加class类名
         */
        tableCellClassName({ row, column, rowIndex, columnIndex }) {
            // 从父组件传入单元格合并方法
            return this.cellClassName({ row, column, rowIndex, columnIndex });
        },
        /**
         * 重新布局表格
         */
        async doLayout() {
            try {
                /* this.tableWraperKey = getRandom(15, 'table_wraper_key_');
                await this.setCheckboxEcho();  */
                await this.$nextTick();
                if (!this.tableConfig.isTableFullArea) {
                    await this.$nextTick();
                    // 计算表格布局时， 如果表格区域部分不是撑满， 那么动态计算tableBodyWraper的高度和最大高度， 用来实现表格随内容自动撑满并且出现滚动条
                    const _table = document.querySelector(`#${this.tableWraperId}`);
                    const tableBodyWraper: HTMLElement = _table.querySelector('.el-table__body-wrapper');
                    const tableHeaderWraper: HTMLElement = _table.querySelector('.el-table__header')
                    const tableBody: HTMLElement = _table.querySelector('.el-table__body')
                    if (tableBodyWraper && tableHeaderWraper && tableBody) {
                        tableBodyWraper.style.height = tableBody.offsetHeight + 'px';
                        tableBodyWraper.style['max-height'] = `calc(100% - ${tableHeaderWraper.offsetHeight}px)`;
                    }
                }
                this.$refs[this.tableConfig.tableRef].doLayout();
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * 表格的body的行点击事件
         */
        rowClick(row, column, event) {
            console.log(row, event, column);
            this.$emit('rowClickEvent', { row, event, column });
        },
        /**
         * 表格的body的行双击事件
         */
        rowDblClick(row, column, event) {
            console.log(row, event, column);
            this.$emit('rowDblClickEvent', { row, event, column });
        },
        /**
         * 表格的header的点击事件
         */
        headerClick(column, event) {
            console.log(event, column);
            this.$emit('headerClickEvent', { event, column });
        },
        /**
         * expand-change 事件
         */
        expandChange(row, expandedRows) {
            console.log(row, expandedRows);
            this.$emit('expandChangeEvent', { row, expandedRows });
        }
    }
}

// 表格的自定义部分 相关， 自定义各种data数据、方法 等
export const TableCustomMixin = {
    data() {
        return {
            tableWraperId: getRandom(15, 'table_wraper_id_')
        }
    },
    methods: {
        /**
         * column 中的type字段为空时， 如果需要点击事件， 需要同时配置clickEventName， 或者通过设置slot_column进行slot写入
         */
        customCellClickEvent(event, customColumn, scope) {
            if (customColumn.clickEventName) {
                // 如果当前渲染有点击事件， 那么不允许事件传播触发rowClick事件
                event.stopPropagation();
                this.$emit(customColumn.clickEventName, scope);
            }
        }
    }
}

// index.vue 和 column.vue 公共部分
export const TableIndexColumnMixin = {
    data() {
        return {}
    },
    computed: {
        computeMinWidth: () => {
            // 动态计算表格的最小minWidth
            return (label, fontSize) => {
                const len = label.length;
                // 可以单独设置每个cell的最小宽度， 也可以通过给tableConfig 传参设置表格的fontSize的大小
                // 根据label字符数量设置， 默认字体14px， 加上每个字体两侧各0.5px的补余 加上每个单元格左右各5px的美观优化
                return len * (fontSize || 14) + (len) + 5 + 5;
            }
        }
    }
}
