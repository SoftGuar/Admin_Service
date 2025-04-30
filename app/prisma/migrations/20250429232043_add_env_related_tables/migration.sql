-- CreateEnum
CREATE TYPE "ZoneType" AS ENUM ('CIRCULATION', 'WORK', 'SERVICE', 'FORBIDDEN', 'DANGER');

-- CreateEnum
CREATE TYPE "LimitsType" AS ENUM ('CIRCULAR', 'POLYGON', 'POINTS', 'ELEMENTS');

-- CreateTable
CREATE TABLE "Environment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "environmentId" INTEGER NOT NULL,
    "zoneType" "ZoneType" NOT NULL,
    "limitsType" "LimitsType" NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "POICategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "POICategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "POI" (
    "id" SERIAL NOT NULL,
    "coordinates" TEXT NOT NULL,
    "poiCategoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "POI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementsLimits" (
    "id" SERIAL NOT NULL,
    "limits_id" INTEGER NOT NULL,

    CONSTRAINT "ElementsLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementsLimitsToEnvironmentElement" (
    "id" SERIAL NOT NULL,
    "elementsLimitsId" INTEGER NOT NULL,
    "environmentId" INTEGER NOT NULL,
    "objectId" INTEGER NOT NULL,

    CONSTRAINT "ElementsLimitsToEnvironmentElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnvironmentElement" (
    "environmentId" INTEGER NOT NULL,
    "objectId" INTEGER NOT NULL,

    CONSTRAINT "EnvironmentElement_pkey" PRIMARY KEY ("environmentId","objectId")
);

-- CreateTable
CREATE TABLE "Object" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircularLimits" (
    "id" SERIAL NOT NULL,
    "centerPointId" INTEGER NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "zoneId" INTEGER NOT NULL,

    CONSTRAINT "CircularLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolygonLimits" (
    "id" SERIAL NOT NULL,
    "centerPointId" INTEGER NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "facesNb" INTEGER NOT NULL,
    "rotation" DOUBLE PRECISION NOT NULL,
    "limits_id" INTEGER NOT NULL,

    CONSTRAINT "PolygonLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointsLimits" (
    "id" SERIAL NOT NULL,
    "limits_id" INTEGER NOT NULL,

    CONSTRAINT "PointsLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_POIToZone" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_POIToZone_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PointToPointsLimits" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PointToPointsLimits_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ElementsLimits_limits_id_key" ON "ElementsLimits"("limits_id");

-- CreateIndex
CREATE UNIQUE INDEX "ElementsLimitsToEnvironmentElement_elementsLimitsId_environ_key" ON "ElementsLimitsToEnvironmentElement"("elementsLimitsId", "environmentId", "objectId");

-- CreateIndex
CREATE UNIQUE INDEX "CircularLimits_zoneId_key" ON "CircularLimits"("zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "PolygonLimits_limits_id_key" ON "PolygonLimits"("limits_id");

-- CreateIndex
CREATE UNIQUE INDEX "PointsLimits_limits_id_key" ON "PointsLimits"("limits_id");

-- CreateIndex
CREATE INDEX "_POIToZone_B_index" ON "_POIToZone"("B");

-- CreateIndex
CREATE INDEX "_PointToPointsLimits_B_index" ON "_PointToPointsLimits"("B");

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "POI" ADD CONSTRAINT "POI_poiCategoryId_fkey" FOREIGN KEY ("poiCategoryId") REFERENCES "POICategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementsLimits" ADD CONSTRAINT "ElementsLimits_limits_id_fkey" FOREIGN KEY ("limits_id") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementsLimitsToEnvironmentElement" ADD CONSTRAINT "ElementsLimitsToEnvironmentElement_elementsLimitsId_fkey" FOREIGN KEY ("elementsLimitsId") REFERENCES "ElementsLimits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementsLimitsToEnvironmentElement" ADD CONSTRAINT "ElementsLimitsToEnvironmentElement_environmentId_objectId_fkey" FOREIGN KEY ("environmentId", "objectId") REFERENCES "EnvironmentElement"("environmentId", "objectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentElement" ADD CONSTRAINT "EnvironmentElement_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentElement" ADD CONSTRAINT "EnvironmentElement_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircularLimits" ADD CONSTRAINT "CircularLimits_centerPointId_fkey" FOREIGN KEY ("centerPointId") REFERENCES "Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircularLimits" ADD CONSTRAINT "CircularLimits_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolygonLimits" ADD CONSTRAINT "PolygonLimits_centerPointId_fkey" FOREIGN KEY ("centerPointId") REFERENCES "Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolygonLimits" ADD CONSTRAINT "PolygonLimits_limits_id_fkey" FOREIGN KEY ("limits_id") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLimits" ADD CONSTRAINT "PointsLimits_limits_id_fkey" FOREIGN KEY ("limits_id") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_POIToZone" ADD CONSTRAINT "_POIToZone_A_fkey" FOREIGN KEY ("A") REFERENCES "POI"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_POIToZone" ADD CONSTRAINT "_POIToZone_B_fkey" FOREIGN KEY ("B") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointToPointsLimits" ADD CONSTRAINT "_PointToPointsLimits_A_fkey" FOREIGN KEY ("A") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointToPointsLimits" ADD CONSTRAINT "_PointToPointsLimits_B_fkey" FOREIGN KEY ("B") REFERENCES "PointsLimits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
