#!/bin/bash
# mysql-backup.sh
# use mysqldump to Dump DB and compress it on the fly to a mounted partition
#
BACKUP_DIR="/data/db-backups"
mkdir -p $BACKUP_DIR
chmod 777 $BACKUP_DIR
#
#
SERIAL="`date +%Y%m%d-%H%M%S`"
 
#=====================================
# Log Functions
#
function LogStart
{
echo "====== Log Start =========" >> $LF
echo "Time: `date`" >> $LF
echo " " >> $LF
}
function LogEnd
{
echo " " >> $LF
echo "Time: `date`" >> $LF
echo "====== Log End   =========" >> $LF
}
 
#=====================================
#
#
function GetDBList
{
echo "Calling GetDBList()" >> $LF
mysqlshow |grep "|"| tr -d ' '|tr -d '|'| egrep -v Databases > $DBLIST
}
 
#=====================================
#
#
function DoBackup
{
echo "Calling DoBackup()" >> $LF
 
DBFILE=$BACKUP_DIR/db-$DB-$SERIAL.sql
echo "Host [$H]" >> $LF
echo "DB File [$DBFILE]" >> $LF
if [ -a  $DBFILE ]
then
mv $DBFILE $DBFILE.`date '+%M%S'`
fi
echo "Dumping ${DB}" >> $LF
mysqldump -B ${DB}  --add-drop-database --add-drop-table >> ${DBFILE}
echo "Zipping up file!" >> $LF
gzip ${DBFILE}
echo "Done!" >> $LF
}
 
FILE_DATE=`date '+%Y-%m-%d'`
LF_DIR=/logs/db-backup
LF=$LF_DIR/db-backup-$FILE_DATE.log
mkdir -p $LF_DIR
chmod 777 $LF_DIR
touch $LF
chmod 664 $LF
 
DBLIST=/tmp/dblist-$FILE_DATE.list
 
LogStart
#=====================================
#
#                     MAIN Code Start
 
GetDBList
while read line
do
echo "Backuping up: $line"
H="localhost"
DB=$line
DoBackup
done < $DBLIST
echo "All backups Completed" >> $LF
LogEnd
#
# EOF