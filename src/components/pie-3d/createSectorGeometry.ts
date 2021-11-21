import { CylinderGeometry, Vector3 } from "three";
import RectangleGeometry from "./RectangleGeometry";

//创建一个扇形的几何体集合(扇面 + 两侧)
const createSectorGeometry = (radius: number, height: number, radialSegments: number, heightSegments: number, openEnded: boolean, thetaStart: number, thetaLength: number): [CylinderGeometry, RectangleGeometry, RectangleGeometry] => {
    //先创建一个临时的扇形(圆柱体)，请注意一定要设置 radialSegments 和 heightSegments 的值都为 1
    const tempCylinder = new CylinderGeometry(radius, radius, height, 1, 1, openEnded, thetaStart, thetaLength)
    //从这个临时的扇形(圆柱体)中提取出全部的顶点信息
    const positions = tempCylinder.attributes.position.array //一共会得到 30 个数值，其中每 3 个对应一个坐标信息

    const points: Vector3[] = []
    //由扇形(圆柱体)的顶点信息(共30个)得到扇形(圆柱体)的全部顶点坐标(共10个)
    for (let i = 0; i < positions.length; i += 3) {
        const point = new Vector3(positions[i], positions[i + 1], positions[i + 2])
        points.push(point)
    }

    //针对得到的 10 个坐标点位置的特别说明：
    //points[0]和points[5]：扇形靠近屏幕的上方弧形的顶点位置
    //points[1]和points[6]：扇形远离屏幕的上方弧形的顶点位置
    //points[2]和points[8]：扇形靠近屏幕的下方弧形的顶点位置
    //points[3]和points[9]：扇形远离屏幕的下方弧形的顶点位置
    //point[4]：扇形圆心上方顶点的位置
    //point[7]：扇形圆心下方顶点的位置

    //我们需要从上面 10 个顶点位置中，找到 2 组，每组包含 4 个顶点位置，这样可以组成扇形的 2 个侧面
    //然后将这 2 组顶点位置信息交由 RectangleGeometry 创建出 2 个具体的面
    //注意：这 2 组中顶点的位置顺序是由特殊规律的

    //扇形的前方侧面
    const oneSide = new RectangleGeometry(points[4], points[0], points[2], points[7])
    //扇形的后方侧面
    const otherSide = new RectangleGeometry(points[1], points[4], points[7], points[3])
    //创建真正的扇形(圆柱体)
    const cylinder = new CylinderGeometry(radius, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)

    //返回扇形(圆柱体)和两个侧面
    return [cylinder, oneSide, otherSide]

    //日后可完善的地方：
    //原本想通过 'three-csg-ts' 这样的库，将 3 个 BufferGeometry 合并成一个 BufferGeometry，这样就可以返回一个 BufferGeometry
    //但是经过实际测试，发现通过使用 CSG.union() 合并后的对象不包含扇形主体，只显示了扇形两侧，具体原因日后查明再做处理
}

export default createSectorGeometry