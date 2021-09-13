import DropdownProjectItem from '../components/dropdown-project-item'

const projects = [
    {key: "17104 CSS", value: "17104 CSS", text:"17104 CSS", content: (<DropdownProjectItem fav={true} value="17104 CSS"/>)},
    {key: "17101 KLS", value: "17101 KLS", text:"17101 KLS", content: (<DropdownProjectItem fav={true} value="17101 KLS"/>)},
    {key: "12101 HKGTA", value: "12101 HKGTA", text:"12101 HKGTA", content: (<DropdownProjectItem  value="12101 HKGTA"/>)},
    {key: "12102 DPSM", value: "12102 DPSM", text:"12102 DPSM", content: (<DropdownProjectItem  value="12102 DPSM"/>)}
]

const announcement = [
    {announcement: "大致多雲，間中有驟雨及幾陣狂風雷暴。吹和緩東風，風勢間中清勁。", date:"Aug 31, 2021"},
    {announcement: "較早前因交通意外而封閉的龍翔道(往荃灣方向)近畢架山花園的部份行車線現已解封。", date:"Aug 31, 2021"},
    {announcement: "較早前因交通意外而封閉的元朗公路(往上水方向)近公庵路的快線現已解封。", date:"Aug 31, 2021"},
]

export default {
    projects,
    announcement
}