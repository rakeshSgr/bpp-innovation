let emailTemplates = [
	{
		UidData: {
			Poi: {
				dob: '12/12/1997',
				gender: 'male',
				name: 'Robert Deal',
			},
		},
		uid: '123456789435',
	},
	{
		UidData: {
			Poi: {
				dob: '12/12/2012',
				gender: 'male',
				name: 'Debra Edwards',
			},
		},
		uid: '123456789561',
	},
	{
		UidData: {
			Poi: {
				dob: '12/12/2002',
				gender: 'female',
				name: 'Holly Stigall',
			},
		},
		uid: '123456789278',
	},
]
var moment = require('moment')

module.exports = {
	async up(db) {
		try {
			global.migrationMsg = 'Aadhaar data migrated!'
			let notificationTemplateData = []
			emailTemplates.forEach(async function (emailTemplate) {
				emailTemplate['status'] = 'active'
				emailTemplate['deleted'] = false
				emailTemplate['updatedAt'] = moment().format()
				emailTemplate['createdAt'] = moment().format()
				emailTemplate['createdBy'] = 'SYSTEM'
				emailTemplate['updatedBy'] = 'SYSTEM'
				notificationTemplateData.push(emailTemplate)
			})
			await db.collection('aadhaardetails').insertMany(notificationTemplateData)
		} catch (error) {
			console.log(error)
		}
	},

	async down(db) {
		db.collection('aadhaardetails').deleteMany({
			code: { $in: emailTemplates.map((emailTemplate) => emailTemplate.code) },
		})
	},
}
